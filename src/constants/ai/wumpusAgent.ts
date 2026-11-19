// src/constants/ai/wumpusAgent.ts
import { actions, enemyType, roomType, variables } from "@/constants/configs";
import {
  cardinalDir,
  directionStorage,
  mapStorage,
  posStorage,
  type position,
} from "@/constants/directionalMap/directionalMapStorage";
import {
  facedDirection,
  getRoom,
  getRoomData,
  getRooomEnemy,
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
  visitCount: number;
  lastVisitedTurn: number;
  isHole: boolean;
  hasBats: boolean;
  hasWumpusTrace: boolean;
}

interface SimState {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  roseWind: number;
}

export interface AgentDecision {
  action: string;
  reason: string;
}

const posKey = (x: number, y: number) => `${x},${y}`;
const stateKey = (s: SimState) =>
  `${s.x},${s.y}|${s.prevX},${s.prevY}|${s.roseWind}`;

class WumpusAIAgent {
  private memory: Map<string, KnownCell> = new Map();
  private lastWumpusPos: { x: number; y: number; turnSeen: number } | null =
    null;
  private plannedActions: string[] = [];
  private lastPosKey: string = "";
  private mapSignature: string = "";
  private internalTurn: number = 0;

  public reset() {
    this.memory.clear();
    this.lastWumpusPos = null;
    this.plannedActions = [];
    this.lastPosKey = "";
    this.mapSignature = "";
    this.internalTurn = 0;
  }

  private checkMapChanged() {
    const map = mapStorage.map;
    if (!map || map.length === 0) return;
    const sig = map
      .map((row) =>
        row.map((c) => `${c.place}${c.n ? 1 : 0}${c.e ? 1 : 0}`).join(""),
      )
      .join("|");

    if (this.mapSignature && this.mapSignature !== sig) {
      this.reset();
    }
    this.mapSignature = sig;
  }

  private getCurrentSimState(): SimState {
    return {
      x: posStorage.pos.x,
      y: posStorage.pos.y,
      prevX: posStorage.prev.x,
      prevY: posStorage.prev.y,
      roseWind: directionStorage.dir.roseWind,
    };
  }

  private getTransitions(
    s: SimState,
    cell: KnownCell,
  ): { action: string; next: SimState }[] {
    const results: { action: string; next: SimState }[] = [];

    const hasDoor = (rose: number): boolean => {
      const dir = facedDirection(rose);
      if (dir === cardinalDir.norteS) return cell.n;
      if (dir === cardinalDir.surS) return cell.s;
      if (dir === cardinalDir.esteS) return cell.e;
      if (dir === cardinalDir.oesteS) return cell.o;
      return false;
    };

    const stepCardinal = (
      x: number,
      y: number,
      rose: number,
    ): position | null => {
      let nx = x;
      let ny = y;
      if (rose === cardinalDir.norteN) ny -= 1;
      else if (rose === cardinalDir.oesteN) nx -= 1;
      else if (rose === cardinalDir.surN) ny += 1;
      else if (rose === cardinalDir.esteN) nx += 1;
      if (nx < 0 || nx > 6 || ny < 0 || ny > 6) return null;
      return { x: nx, y: ny };
    };

    // 1. FRONT: valida puerta en roseWind, mueve con vector (pos - prev)
    if (hasDoor(s.roseWind)) {
      const dx = s.x - s.prevX;
      const dy = s.y - s.prevY;
      const fx = s.x + dx;
      const fy = s.y + dy;
      if (
        Math.abs(dx) + Math.abs(dy) === 1 &&
        fx >= 0 &&
        fx <= 6 &&
        fy >= 0 &&
        fy <= 6
      ) {
        const doorOk =
          (dy === -1 && cell.n) ||
          (dy === 1 && cell.s) ||
          (dx === 1 && cell.e) ||
          (dx === -1 && cell.o);
        if (doorOk) {
          results.push({
            action: actions.front,
            next: {
              x: fx,
              y: fy,
              prevX: s.x,
              prevY: s.y,
              roseWind: s.roseWind,
            },
          });
        }
      }
    }

    // 2. LEFT: roseWind + 1
    const leftDir = s.roseWind + 1 > 4 ? 1 : s.roseWind + 1;
    if (hasDoor(leftDir)) {
      const lPos = stepCardinal(s.x, s.y, leftDir);
      if (lPos) {
        results.push({
          action: actions.left,
          next: {
            x: lPos.x,
            y: lPos.y,
            prevX: s.x,
            prevY: s.y,
            roseWind: leftDir,
          },
        });
      }
    }

    // 3. RIGHT: roseWind - 1
    const rightDir = s.roseWind - 1 < 1 ? 4 : s.roseWind - 1;
    if (hasDoor(rightDir)) {
      const rPos = stepCardinal(s.x, s.y, rightDir);
      if (rPos) {
        results.push({
          action: actions.right,
          next: {
            x: rPos.x,
            y: rPos.y,
            prevX: s.x,
            prevY: s.y,
            roseWind: rightDir,
          },
        });
      }
    }

    // 4. BACK: goBack invierte roseWind e intercambia pos y prev
    let backDir = s.roseWind - 2;
    if (backDir === 0) backDir = 4;
    if (backDir === -1) backDir = 3;
    if (
      hasDoor(backDir) &&
      s.prevX >= 0 &&
      s.prevX <= 6 &&
      s.prevY >= 0 &&
      s.prevY <= 6
    ) {
      results.push({
        action: actions.back,
        next: {
          x: s.prevX,
          y: s.prevY,
          prevX: s.x,
          prevY: s.y,
          roseWind: backDir,
        },
      });
    }

    return results;
  }

  private perceiveCurrentRoom() {
    this.checkMapChanged();
    this.internalTurn++;

    const pos = posStorage.pos;
    const data = getRoomData();
    const enemy = getRooomEnemy();
    const key = posKey(pos.x, pos.y);
    const hasLight = inventoryStorage.inv.light;

    // Si hubo teletransporte por vampiros (salto > 1 casilla), invalidar ruta pendiente
    if (this.lastPosKey && this.lastPosKey !== key) {
      const [lx, ly] = this.lastPosKey.split(",").map(Number);
      if (Math.abs(lx - pos.x) + Math.abs(ly - pos.y) > 1) {
        this.plannedActions = [];
      }
    }
    this.lastPosKey = key;

    const prevRecord = this.memory.get(key);
    const isHole = hasLight && data.place === roomType.hole;
    const hasBats =
      data.place === roomType.passageway && enemy === enemyType.bats;
    const hasWumpusHere = enemy === enemyType.wumpus;

    // Solo consideramos rastro activo si es una marca temporal (wumpusMarks) o si está aquí ahora.
    // Ya NO tratamos wumpusCove como imán permanente porque el Wumpus patrulla todo el mapa.
    const hasWumpusTrace = hasWumpusHere || data.place === roomType.wumpusMarks;

    if (hasWumpusHere) {
      this.lastWumpusPos = { x: pos.x, y: pos.y, turnSeen: this.internalTurn };
    } else if (this.lastWumpusPos) {
      // Si llegamos donde estaba y ya se fue, o pasaron más de 6 turnos, descartar pista vieja
      if (
        (this.lastWumpusPos.x === pos.x && this.lastWumpusPos.y === pos.y) ||
        this.internalTurn - this.lastWumpusPos.turnSeen > 6
      ) {
        this.lastWumpusPos = null;
      }
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
      visitCount: (prevRecord?.visitCount ?? 0) + 1,
      lastVisitedTurn: this.internalTurn,
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
          visitCount: 0,
          lastVisitedTurn: -1,
          isHole: false,
          hasBats: false,
          hasWumpusTrace: false,
        });
      }
    }
  }

  private planPath(
    goal: (cell: KnownCell) => boolean,
    avoidWumpus: boolean,
    avoidBatsWhenDark: boolean,
  ): string[] | null {
    const start = this.getCurrentSimState();
    const startKey = stateKey(start);
    const hasLight = inventoryStorage.inv.light;

    const queue: { state: SimState; path: string[] }[] = [
      { state: start, path: [] },
    ];
    const visitedStates = new Set<string>([startKey]);

    while (queue.length > 0) {
      const { state, path } = queue.shift()!;
      const cell = this.memory.get(posKey(state.x, state.y));
      if (!cell) continue;

      if (path.length > 0 && goal(cell)) {
        return path;
      }

      if (!cell.visited || cell.isHole) continue;

      const transitions = this.getTransitions(state, cell);

      for (const { action, next } of transitions) {
        const nStateKey = stateKey(next);
        if (visitedStates.has(nStateKey)) continue;

        const nextCell = this.memory.get(posKey(next.x, next.y));
        if (!nextCell || nextCell.isHole) continue;

        if (avoidBatsWhenDark && !hasLight && nextCell.hasBats) continue;

        if (
          avoidWumpus &&
          this.lastWumpusPos &&
          this.lastWumpusPos.x === next.x &&
          this.lastWumpusPos.y === next.y
        ) {
          continue;
        }

        visitedStates.add(nStateKey);
        queue.push({ state: next, path: [...path, action] });
      }
    }

    return null;
  }

  public decideNextAction(): AgentDecision {
    this.perceiveCurrentRoom();

    const room = getRoom();
    const enemy = getRooomEnemy();
    const inv = inventoryStorage.inv;
    const minRequiredAmmo = Math.max(variables.wumpusLife, wumpusStorage.life);

    // 0. AGUJERO DETECTADO CON CANDIL -> retroceder de inmediato
    if (inv.light && room === roomType.hole) {
      this.plannedActions = [];
      return {
        action: actions.back,
        reason: "¡Agujero detectado con candil! Retrocediendo",
      };
    }

    // 1. ARMERÍA -> recoger espada y balas
    if (room === roomType.armory) {
      this.plannedActions = [];
      return {
        action: actions.intereact,
        reason: `Saqueando armería (Balas: ${inv.amo} -> objetivo: ${minRequiredAmmo})`,
      };
    }

    // 2. GHOUL COVE CON ESPADA -> conseguir candil gratis
    if (room === roomType.ghoulCove && inv.sword && enemy === enemyType.ghoul) {
      this.plannedActions = [];
      return {
        action: actions.shoot,
        reason: "Derrotando Ghoul con espada para obtener candil",
      };
    }

    // 3. VAMPIROS -> jamás gastar si tenemos <= 4 balas
    if (room === roomType.passageway && enemy === enemyType.bats) {
      if (!inv.light && inv.amo > minRequiredAmmo) {
        return {
          action: actions.shoot,
          reason: `Munición excedente (${inv.amo}): ahuyentando vampiros`,
        };
      }
    }

    // 4. WUMPUS -> jamás disparar si tenemos < 4 balas
    if (enemy === enemyType.wumpus) {
      this.plannedActions = [];
      if (inv.amo >= minRequiredAmmo) {
        return {
          action: actions.shoot,
          reason: `¡Disparo letal al Wumpus! (${inv.amo} balas)`,
        };
      }

      const escapePlan =
        this.planPath(
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
        this.planPath(
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

      if (escapePlan && escapePlan.length > 0) {
        const nextAct = escapePlan.shift()!;
        this.plannedActions = escapePlan;
        return {
          action: nextAct,
          reason: `Reservando balas (${inv.amo}/${minRequiredAmmo}): huyendo del Wumpus`,
        };
      }
    }

    // Ejecutar plan multi-paso en curso si sigue siendo válido
    if (this.plannedActions.length > 0) {
      const currCell = this.memory.get(
        posKey(posStorage.pos.x, posStorage.pos.y),
      );
      const nextAct = this.plannedActions[0];
      if (currCell) {
        const validNext = this.getTransitions(
          this.getCurrentSimState(),
          currCell,
        ).find((t) => t.action === nextAct);
        const destCell = validNext
          ? this.memory.get(posKey(validNext.next.x, validNext.next.y))
          : null;

        if (validNext && (!destCell || !destCell.isHole)) {
          this.plannedActions.shift();
          return {
            action: nextAct,
            reason: `Siguiendo ruta (${this.plannedActions.length + 1} pasos restantes)`,
          };
        }
      }
      this.plannedActions = [];
    }

    const readyToHunt = inv.amo >= minRequiredAmmo;

    // 5. PERSEGUIR AVISTAMIENTO RECIENTE DEL WUMPUS (solo si tiene <= 6 turnos de antigüedad)
    if (readyToHunt && this.lastWumpusPos) {
      const target = this.lastWumpusPos;
      const huntPlan =
        this.planPath(
          (c) => c.x === target.x && c.y === target.y,
          false,
          true,
        ) ??
        this.planPath(
          (c) => c.x === target.x && c.y === target.y,
          false,
          false,
        );

      if (huntPlan && huntPlan.length > 0) {
        const nextAct = huntPlan.shift()!;
        this.plannedActions = huntPlan;
        return {
          action: nextAct,
          reason: `Persiguiendo al Wumpus hacia (${target.x + 1}, ${target.y + 1})`,
        };
      }
    }

    // 6. EXPLORAR SALAS AÚN NO VISITADAS DEL MAPA
    const explorePlan =
      this.planPath((c) => !c.visited, !readyToHunt, true) ??
      this.planPath((c) => !c.visited, !readyToHunt, false);

    if (explorePlan && explorePlan.length > 0) {
      const nextAct = explorePlan.shift()!;
      this.plannedActions = explorePlan;
      return {
        action: nextAct,
        reason: readyToHunt
          ? "Barriendo sectores inexplorados en busca del Wumpus"
          : `Buscando armerías (${inv.amo}/${minRequiredAmmo} balas)`,
      };
    }

    // 7. BARRIDO GLOBAL POR FRESCURA (ir a la sala del mapa que lleve MÁS turnos sin visitarse)
    // Esto evita quedarse dando vueltas en la guarida del Wumpus y recorre todo el tablero
    let stalestCell: KnownCell | null = null;
    for (const cell of this.memory.values()) {
      if (!cell.visited || cell.isHole) continue;
      if (cell.x === posStorage.pos.x && cell.y === posStorage.pos.y) continue;
      if (
        !readyToHunt &&
        this.lastWumpusPos &&
        this.lastWumpusPos.x === cell.x &&
        this.lastWumpusPos.y === cell.y
      ) {
        continue;
      }

      if (!stalestCell || cell.lastVisitedTurn < stalestCell.lastVisitedTurn) {
        stalestCell = cell;
      }
    }

    if (stalestCell) {
      const target = stalestCell;
      const patrolPlan =
        this.planPath(
          (c) => c.x === target.x && c.y === target.y,
          !readyToHunt,
          true,
        ) ??
        this.planPath(
          (c) => c.x === target.x && c.y === target.y,
          !readyToHunt,
          false,
        );

      if (patrolPlan && patrolPlan.length > 0) {
        const nextAct = patrolPlan.shift()!;
        this.plannedActions = patrolPlan;
        return {
          action: nextAct,
          reason: readyToHunt
            ? `Patrullando mapa completo -> (${target.x + 1}, ${target.y + 1})`
            : `Buscando rutas alternativas (${inv.amo}/${minRequiredAmmo} balas)`,
        };
      }
    }

    // 8. RESPALDO FINAL DE MOVIMIENTO VÁLIDO
    const currCell = this.memory.get(
      posKey(posStorage.pos.x, posStorage.pos.y),
    );
    if (currCell) {
      const transitions = this.getTransitions(
        this.getCurrentSimState(),
        currCell,
      );
      let bestAct: string | null = null;
      let oldestTurn = Infinity;

      for (const { action, next } of transitions) {
        const destCell = this.memory.get(posKey(next.x, next.y));
        if (destCell?.isHole) continue;
        const turn = destCell?.lastVisitedTurn ?? -1;
        if (turn < oldestTurn) {
          oldestTurn = turn;
          bestAct = action;
        }
      }

      if (bestAct) {
        return {
          action: bestAct,
          reason: "Reorientando patrulla por el laberinto",
        };
      }
    }

    return {
      action: actions.back,
      reason: "Retrocediendo en callejón sin salida",
    };
  }
}

export const wumpusAgent = new WumpusAIAgent();
