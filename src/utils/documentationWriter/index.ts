import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';

import { ConfiguredIdentityProvider, IdentityProvider } from '~types';

type Coordinates = {
  x: number;
  y: number;
  maxWidth?: number;
  wordBreak?: string[];
  font?: PDFFont;
  size?: number;
  formatter?: (str: string) => void;
};

type TIdentityProvider = keyof Partial<ConfiguredIdentityProvider>;
const targetCoordinates: Record<TIdentityProvider, Coordinates> = {
  domain: { x: 55, y: 2726 },
  acsUrl: { x: 55, y: 2778, size: 10 },
};

const generateDocumentation = async (
  template: ArrayBuffer,
  identityProvider: IdentityProvider,
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);

  const url = 'https://github.com/enterprise-oss/SFMonoFont/blob/master/SFMono-Regular.otf?raw=true';
  const fontBytes = await fetch(url).then((res) => res.arrayBuffer());

  const font = await pdfDoc.embedFont(fontBytes);
  const firstPage = pdfDoc.getPages()[0];

  Object.entries(targetCoordinates).forEach(([key, coordinates]) => {
    const text = identityProvider[key as TIdentityProvider];
    text && writeField(firstPage, text, { ...coordinates, font });
  });

  return pdfDoc.save();
};

const writeField = (page: PDFPage, text: string, coordinates: Coordinates) => {
  const { height } = page.getSize();
  const { y, ...rest } = coordinates;

  page.drawText(text, {
    size: 12,
    ...rest,
    y: height - y,
  });
};

// const fetchTemplate = ({ service }: IdentityProvider): ArrayBuffer => {
//   // make a fetch() call and use res.arrayBuffer()

//   return new ArrayBuffer(600);
// };

export default generateDocumentation;
