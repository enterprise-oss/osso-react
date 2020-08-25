import fontkit from '@pdf-lib/fontkit';
import { decode } from 'base64-arraybuffer';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';

import { IdentityProvider, Providers } from '~/types';

// NB: rollup plugins not playing well with each other,
// so no root aliasing
import SFMono from '../../resources/SFMono-Regular.ttf';

export const PDF_VERSION = 1;

type Coordinates = {
  x: number;
  y: number;
  maxWidth?: number;
  wordBreak?: string[];
  font?: PDFFont;
  size?: number;
  formatter?: (str: string) => void;
};

const providerCoordinates = {
  [Providers.Azure]: {
    domain: { x: 55, y: 2726 },
    acsUrl: { x: 55, y: 2778, size: 10 },
  },
  [Providers.Okta]: {
    domain: { x: 55, y: 2726 },
    acsUrl: { x: 55, y: 2778, size: 10 },
  },
};

const generateDocumentation = async (
  template: ArrayBuffer,
  identityProvider: IdentityProvider,
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = decode(SFMono);

  const font = await pdfDoc.embedFont(fontBytes);
  const firstPage = pdfDoc.getPages()[0];

  Object.entries(providerCoordinates[identityProvider.service]).forEach(([key, coordinates]) => {
    const text = identityProvider[key as keyof IdentityProvider];
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

export default generateDocumentation;
