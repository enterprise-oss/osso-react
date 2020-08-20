import { PDFDocument, PDFPage } from 'pdf-lib';

import { ConfiguredIdentityProvider, IdentityProvider } from '~types';

type Coordinates = {
  x: number;
  y: number;
  formatter?: (str: string) => void;
};

type TIdentityProvider = keyof Partial<ConfiguredIdentityProvider>;
const targetCoordinates: Record<TIdentityProvider, Coordinates> = {
  domain: { x: 359, y: 2729 },
  acsUrl: { x: 359, y: 2753 },
};

const generateDocumentation = async (
  template: ArrayBuffer,
  identityProvider: IdentityProvider,
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(template);
  const firstPage = pdfDoc.getPages()[0];

  Object.entries(targetCoordinates).forEach(([key, coordinates]) => {
    const text = identityProvider[key as TIdentityProvider];
    text && writeField(firstPage, text, coordinates);
  });

  return pdfDoc.save();
};

const writeField = (page: PDFPage, text: string, coordinates: Coordinates) => {
  const { height } = page.getSize();
  const { x, y } = coordinates;

  page.drawText(text, {
    x,
    y: height - y,
    size: 12,
  });
};

// const fetchTemplate = ({ service }: IdentityProvider): ArrayBuffer => {
//   // make a fetch() call and use res.arrayBuffer()

//   return new ArrayBuffer(600);
// };

export default generateDocumentation;
