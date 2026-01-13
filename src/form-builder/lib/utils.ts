import pluginEstree from "prettier/plugins/estree"; // required!
import parserTypeScript from "prettier/plugins/typescript";
import { format } from "prettier/standalone";

export const isStatic = (fieldType: string) => {
  return ["Separator", "H1", "H2", "H3", "P", "Text"].includes(fieldType);
};

export async function formatCode(code: string): Promise<string> {
  return format(code, {
    // Parser
    parser: "typescript", // Use TypeScript parser for .ts/.tsx files
    plugins: [parserTypeScript, pluginEstree],
  }).then((formatted) => formatted);
}
