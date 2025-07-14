declare module "fast-average-color" {
  export class FastAverageColor {
    constructor();

    getColorAsync(
      element: Element | string
    ): Promise<{
      rgb: string;
      rgba: string;
      hex: string;
      hex8: string;
      isDark: boolean;
    }>;

    destroy(): void;
  }
}
