import { TextEncoder, TextDecoder as UtilTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = UtilTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};
