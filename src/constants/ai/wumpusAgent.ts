// src/constants/ai/wumpusAgent.ts
import { actions, enemyType, roomType, variables } from "@/constants/configs";
import {
    cardinalDir,
    directionStorage,
    posStorage,
    type position,
} from "@/constants/directionalMap/directionalMapStorage";
import {
    facedDirection,
    getRoom,
    getRoomData,
    getRooomEnemy,
    validDirections,
    validDirectionsBool,
} from "@/constants/directionalMap/directionUtils";
import { inventoryStorage } from "@/constants/inventory/inventoryStorage";
import { wumpusStorage } from "@/constants/wumpus/WumpusStorage";

interface KnownCell {
  x: number;
  y: number;
  n: boolean;
  s: boolean;
  e: boolean;
  o: boolean;
  place: string;
  visited: boolean;
  isHole: boolean;
  hasBats: boolean;
  hasWumpusTrace: boolean;
}

export interface AgentDecision {
  action: string;
  reason: string;
}

const posKey = (x: number, y: number) => `${x},${y}`;

class WumpusAIAgent {
  private memory: Map<string, KnownCell> = new Map();
  private lastWumpusPos: position | null = null;
  private visitedSequence: string[] = [];

  public reset() {
    this.memory.clear();
    this.lastWumpusPos = null;
    this.visitedSequence = [];
  }

  private simulateMoveTargets(): Map<string, position> {
    const targets = new Map<string, position>();
    const pos = posStorage.pos;
    const prev = posStorage.prev;
    const rose = directionStorage.dir.roseWind;
    const valid = validDirections();
    const valBool = validDirectionsBool();

    if (valid.includes(facedDirection(rose))) {
      const dx = pos.x - prev.x;
      const dy = pos.y - prev.y;
      const fx = pos.x + dx;
      const fy = pos.y + dy;
      if (fx >= 0 && fx <= 6 && fy >= 0 && fy <= 6) {
        targets.set(actions.front, { x: fx, y: fy });
      }
    }

    if (
      valBool.back &&
      prev.x >= 0 &&
      prev.x <= 6 &&
      prev.y >= 0 &&
      prev.y <= 6
    ) {
      targets.set(actions.back, { x: prev.x, y: prev.y });
    }

    const leftDir = rose + 1 > 4 ? 1 : rose + 1;
    if (valid.includes(facedDirection(leftDir))) {
      const lPos = this.stepByRoseWind(pos, leftDir);
      if (lPos) targets.set(actions.left, lPos);
    }

    const rightDir = rose - 1 < 1 ? 4 : rose - 1;
    if (valid.includes(facedDirection(rightDir))) {
      const rPos = this.stepByRoseWind(pos, rightDir);
      if (rPos) targets.set(actions.right, rPos);
    }

    return targets;
  }

  private stepByRoseWind(pos: position, rose: number): position | null {
    let nx = pos.x;
    let ny = pos.y;
    if (rose === cardinalDir.norteN) ny -= 1;
    else if (rose === cardinalDir.oesteN) nx -= 1;
    else if (rose === cardinalDir.surN) ny += 1;
    else if (rose === cardinalDir.esteN) nx += 1;

    if (nx < 0 || nx > 6 || ny < 0 || ny > 6) return null;
    return { x: nx, y: ny };
  }

  private perceiveCurrentRoom() {
    const pos = posStorage.pos;
    const data = getRoomData();
    const enemy = getRooomEnemy();
    const key = posKey(pos.x, pos.y);

    this.visitedSequence.push(key);
    if (this.visitedSequence.length > 14) this.visitedSequence.shift();

    const isHole = data.place === roomType.hole;
    const hasBats =
      data.place === roomType.passageway && enemy === enemyType.bats;
    const hasWumpusHere = enemy === enemyType.wumpus;
    const hasWumpusTrace =
      hasWumpusHere ||
      data.place === roomType.wumpusMarks ||
      data.place === roomType.wumpusCove;

    if (hasWumpusHere) {
      this.lastWumpusPos = { x: pos.x, y: pos.y };
    } else if (
      this.lastWumpusPos &&
      this.lastWumpusPos.x === pos.x &&
      this.lastWumpusPos.y === pos.y
    ) {
      this.lastWumpusPos = null;
    }

    this.memory.set(key, {
      x: pos.x,
      y: pos.y,
      n: data.n,
      s: data.s,
      e: data.e,
      o: data.o,
      place: data.place,
      visited: true,
      isHole,
      hasBats,
      hasWumpusTrace,
    });

    if (isHole) return;

    const neighbors: { cond: boolean; nx: number; ny: number }[] = [
      { cond: data.n, nx: pos.x, ny: pos.y - 1 },
      { cond: data.s, nx: pos.x, ny: pos.y + 1 },
      { cond: data.e, nx: pos.x + 1, ny: pos.y },
      { cond: data.o, nx: pos.x - 1, ny: pos.y },
    ];

    for (const nb of neighbors) {
      if (!nb.cond || nb.nx < 0 || nb.nx > 6 || nb.ny < 0 || nb.ny > 6)
        continue;
      const nKey = posKey(nb.nx, nb.ny);
      if (!this.memory.has(nKey)) {
        this.memory.set(nKey, {
          x: nb.nx,
          y: nb.ny,
          n: false,
          s: false,
          e: false,
          o: false,
          place: "UNKNOWN",
          visited: false,
          isHole: false,
          hasBats: false,
          hasWumpusTrace: false,
        });
      }
    }
  }

  private getActionToward(targetX: number, targetY: number): string | null {
    const moveTargets = this.simulateMoveTargets();
    for (const [action, dest] of moveTargets.entries()) {
      if (dest.x === targetX && dest.y === targetY) {
        return action;
      }
    }
    return null;
  }

  private bfsNextStep(
    predicate: (cell: KnownCell) => boolean,
    avoidWumpus: boolean,
    avoidBatsWhenDark: boolean,
  ): position | null {
    const start = posStorage.pos;
    const startKey = posKey(start.x, start.y);
    const hasLight = inventoryStorage.inv.light;

    const reachableFirstSteps = this.simulateMoveTargets();
    const reachableCoords = new Set<string>();
    for (const dest of reachableFirstSteps.values()) {
      reachableCoords.add(posKey(dest.x, dest.y));
    }

    const queue: { x: number; y: number; firstStep: position | null }[] = [
      { x: start.x, y: start.y, firstStep: null },
    ];
    const visited = new Set<string>([startKey]);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      const currCell = this.memory.get(posKey(curr.x, curr.y));
      if (!currCell) continue;

      if (curr.firstStep && predicate(currCell)) {
        return curr.firstStep;
      }

      if (!currCell.visited || currCell.isHole) continue;

      const moves: { ok: boolean; nx: number; ny: number }[] = [
        { ok: currCell.n, nx: curr.x, ny: curr.y - 1 },
        { ok: currCell.s, nx: curr.x, ny: curr.y + 1 },
        { ok: currCell.e, nx: curr.x + 1, ny: curr.y },
        { ok: currCell.o, nx: curr.x - 1, ny: curr.y },
      ];

      for (const m of moves) {
        if (!m.ok || m.nx < 0 || m.nx > 6 || m.ny < 0 || m.ny > 6) continue;
        const nKey = posKey(m.nx, m.ny);
        if (visited.has(nKey)) continue;

        if (!curr.firstStep && !reachableCoords.has(nKey)) continue;

        const nextCell = this.memory.get(nKey);
        if (!nextCell) continue;

        if (nextCell.isHole) continue;

        if (avoidBatsWhenDark && !hasLight && nextCell.hasBats) {
          continue;
        }

        if (
          avoidWumpus &&
          this.lastWumpusPos &&
          this.lastWumpusPos.x === m.nx &&
          this.lastWumpusPos.y === m.ny
        ) {
          continue;
        }

        visited.add(nKey);
        queue.push({
          x: m.nx,
          y: m.ny,
          firstStep: curr.firstStep ?? { x: m.nx, y: m.ny },
        });
      }
    }

    return null;
  }

  public decideNextAction(): AgentDecision {
    this.perceiveCurrentRoom();

    const room = getRoom();
    const enemy = getRooomEnemy();
    const inv = inventoryStorage.inv;
    // Mínimo requerido para matar al Wumpus de un solo ataque (por defecto 4)
    const minRequiredAmmo = Math.max(variables.wumpusLife, wumpusStorage.life);

    // 0. SUPERVIVENCIA: Si detecta agujero con candil, retrocede al instante
    if (room === roomType.hole) {
      return {
        action: actions.back,
        reason: "¡Agujero detectado con el candil! Retrocediendo de inmediato",
      };
    }

    // 1. SAQUEAR ARMERÍA (siempre prioridad para acumular >= 4 balas)
    if (room === roomType.armory) {
      return {
        action: actions.intereact,
        reason: `Saqueando armería (Balas actuales: ${inv.amo} -> objetivo: ${minRequiredAmmo})`,
      };
    }

    // 2. ELIMINAR GHOUL CON ESPADA (no gasta balas y da el candil)
    if (room === roomType.ghoulCove && inv.sword && enemy === enemyType.ghoul) {
      return {
        action: actions.shoot,
        reason:
          "Derrotando Ghoul con espada para obtener candil (0 balas gastadas)",
      };
    }

    // 3. CANDADO DE RESERVA CONTRA VAMPIROS:
    // Jamás bajar de `minRequiredAmmo` (4 balas). Solo dispara a vampiros si tiene >= 5 balas.
    if (room === roomType.passageway && enemy === enemyType.bats) {
      if (!inv.light && inv.amo > minRequiredAmmo) {
        return {
          action: actions.shoot,
          reason: `Munición excedente (${inv.amo} > ${minRequiredAmmo}): ahuyentando vampiros`,
        };
      }
      // Si tiene <= 4 balas, NO dispara; avanza y asume posible teletransporte para conservar balas
    }

    // 4. CANDADO DE RESERVA CONTRA EL WUMPUS:
    // Prohibido disparar si inv.amo < minRequiredAmmo (porque utils.tsx pone amo = 0 si no muere).
    if (enemy === enemyType.wumpus) {
      if (inv.amo >= minRequiredAmmo) {
        return {
          action: actions.shoot,
          reason: `¡Disparo letal al Wumpus! (${inv.amo} balas >= ${minRequiredAmmo} vida)`,
        };
      }

      // Retirada táctica obligatoria para buscar más armerías
      const safeEscape =
        this.bfsNextStep(
          (c) =>
            c.visited &&
            !c.isHole &&
            !(
              this.lastWumpusPos &&
              this.lastWumpusPos.x === c.x &&
              this.lastWumpusPos.y === c.y
            ),
          false,
          true,
        ) ??
        this.bfsNextStep(
          (c) =>
            !c.isHole &&
            !(
              this.lastWumpusPos &&
              this.lastWumpusPos.x === c.x &&
              this.lastWumpusPos.y === c.y
            ),
          false,
          false,
        );

      if (safeEscape) {
        const act = this.getActionToward(safeEscape.x, safeEscape.y);
        if (act) {
          return {
            action: act,
            reason: `Reservando balas (${inv.amo}/${minRequiredAmmo}): huyendo del Wumpus a buscar armerías`,
          };
        }
      }
    }

    const readyToHunt = inv.amo >= minRequiredAmmo;

    // 5. CAZAR AL WUMPUS SOLO CUANDO TENEMOS >= 4 BALAS
    if (readyToHunt && this.lastWumpusPos) {
      const target = this.lastWumpusPos;
      const step =
        this.bfsNextStep(
          (c) => c.x === target.x && c.y === target.y,
          false,
          true,
        ) ??
        this.bfsNextStep(
          (c) => c.x === target.x && c.y === target.y,
          false,
          false,
        );

      if (step) {
        const act = this.getActionToward(step.x, step.y);
        if (act) {
          return {
            action: act,
            reason: `Munición lista (${inv.amo}/${minRequiredAmmo}): cazando al Wumpus en (${target.x + 1}, ${target.y + 1})`,
          };
        }
      }
    }

    // 6. EXPLORAR SALAS NO VISITADAS PARA ENCONTRAR ARMERÍAS / WUMPUS
    const exploreStep =
      this.bfsNextStep((c) => !c.visited, !readyToHunt, true) ??
      this.bfsNextStep((c) => !c.visited, !readyToHunt, false);

    if (exploreStep) {
      const act = this.getActionToward(exploreStep.x, exploreStep.y);
      if (act) {
        return {
          action: act,
          reason: `Buscando ${readyToHunt ? "al Wumpus" : `armerías (${inv.amo}/${minRequiredAmmo} balas)`} -> (${exploreStep.x + 1}, ${exploreStep.y + 1})`,
        };
      }
    }

    // 7. SEGUIR RASTROS DEL WUMPUS (solo si ya tenemos las 4 balas)
    if (readyToHunt) {
      const traceStep = this.bfsNextStep((c) => c.hasWumpusTrace, false, false);
      if (traceStep) {
        const act = this.getActionToward(traceStep.x, traceStep.y);
        if (act) {
          return {
            action: act,
            reason: "Siguiendo rastros recientes del Wumpus",
          };
        }
      }
    }

    // 8. MOVIMIENTO ANTI-BUCLE (si un teletransporte de vampiros nos dejó en zona conocida)
    const moveTargets = this.simulateMoveTargets();
    let bestAction: string | null = null;
    let bestScore = Infinity;

    for (const [act, dest] of moveTargets.entries()) {
      const destKey = posKey(dest.x, dest.y);
      const cell = this.memory.get(destKey);
      if (cell?.isHole) continue;

      // No entrar a la celda del Wumpus si aún no tenemos 4 balas
      if (
        !readyToHunt &&
        this.lastWumpusPos &&
        this.lastWumpusPos.x === dest.x &&
        this.lastWumpusPos.y === dest.y
      ) {
        continue;
      }

      const lastIdx = this.visitedSequence.lastIndexOf(destKey);
      const recencyPenalty = lastIdx === -1 ? -100 : lastIdx;

      if (recencyPenalty < bestScore) {
        bestScore = recencyPenalty;
        bestAction = act;
      }
    }

    if (bestAction) {
      return {
        action: bestAction,
        reason: readyToHunt
          ? "Patrullando en busca del Wumpus"
          : `Buscando rutas hacia armerías (${inv.amo}/${minRequiredAmmo} balas)`,
      };
    }

    return {
      action: actions.back,
      reason: "Retrocediendo para buscar camino seguro",
    };
  }
}

export const wumpusAgent = new WumpusAIAgent();
