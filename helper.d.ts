import { Helper as OmniHelper } from '@sotaoi/omni/helper';

declare class Helper extends OmniHelper {
  public static setTitle(title: string): void;

  public static uuid(): string;

  public static isWeb(): boolean;

  public static isMobile(): boolean;

  public static isElectron(): boolean;

  public static encodeSegment(segment: { [key: string]: any }): string;

  public static decodeSegment(segment: string): { [key: string]: string };

  public static asset(item: null | string | { [key: string]: any }, role = 'assets'): null | string;
}

export { Helper };
export type { TransformerFn } from '@sotaoi/omni/helper';
