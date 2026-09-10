//inventario:
export interface inventory {
  amo: number;
  light: boolean;
  sword: boolean;
}
//configuracion base
export const baseInventory = {
  baseAmo: 3,
  extraAmoPerArmory: 1,
  light: false,
  sword: false,
};

export const inventoryStorage: { inv: inventory } = {
  inv: {
    amo: baseInventory.baseAmo,
    light: baseInventory.light,
    sword: baseInventory.sword,
  },
};
