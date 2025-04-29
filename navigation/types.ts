// navigation/types.ts
export type RootStackParamList = {
    FogScreen: undefined;
    DreamScreen: undefined;
    TrellisScreen:  { flowerCounts: Record<string, number> };
  };
  