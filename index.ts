import { signXml } from "./backend/services/signing";
import {
  generateInvoice,
  generateInvoiceXml,
} from "./backend/services/generateInvoice";

try {
  const restaurantInvoice = generateInvoice({
    infoTributaria: {
      ambiente: "1",
      tipoEmision: "1",
      razonSocial: "Restaurante Chifa",
      nombreComercial: "Chifa Hua Wei",
      ruc: "0504138934001",
      codDoc: "01",
      estab: "001",
      ptoEmi: "001",
      secuencial: "000000001",
      dirMatriz: "Quito",
      contribuyenteRimpe: "CONTRIBUYENTE RÉGIMEN RIMPE",
    },
    infoFactura: {
      fechaEmision: "18/11/2023",
      dirEstablecimiento: "Quito",
      obligadoContabilidad: "NO",
      tipoIdentificacionComprador: "05",
      razonSocialComprador: "MIGUEL LANGARANO",
      identificacionComprador: "0504138934",
      direccionComprador: "Republica del salvador",
      totalSinImpuestos: "14.30",
      totalDescuento: "0.00",
      totalConImpuestos: {
        totalImpuesto: [
          {
            codigo: "2",
            codigoPorcentaje: "2",
            descuentoAdicional: "0.00",
            baseImponible: "0.00",
            valor: "0.00",
          },
          {
            codigo: "2",
            codigoPorcentaje: "0",
            descuentoAdicional: "0.00",
            baseImponible: "14.30",
            valor: "0.00",
          },
        ],
      },
      propina: "0.00",
      importeTotal: "14.30",
      moneda: "DOLAR",
      pagos: {
        pago: [
          {
            formaPago: "01",
            total: "14.30",
            plazo: "0",
            unidadTiempo: "dias",
          },
        ],
      },
    },
    detalles: {
      detalle: [
        {
          codigoPrincipal: "00001",
          codigoAuxiliar: "00001",
          descripcion: "Helado simple",
          cantidad: "1.00",
          precioUnitario: "2.25",
          descuento: "0.00",
          precioTotalSinImpuesto: "2.25",
          impuestos: {
            impuesto: [
              {
                codigo: "2",
                codigoPorcentaje: "0",
                tarifa: "0",
                baseImponible: "2.25",
                valor: "0.00",
              },
            ],
          },
        },
        {
          codigoPrincipal: "00002",
          codigoAuxiliar: "00002",
          descripcion: "Helado doble",
          cantidad: "1.00",
          precioUnitario: "12.05",
          descuento: "0.00",
          precioTotalSinImpuesto: "12.05",
          impuestos: {
            impuesto: [
              {
                codigo: "2",
                codigoPorcentaje: "0",
                tarifa: "0",
                baseImponible: "12.05",
                valor: "0.00",
              },
            ],
          },
        },
      ],
    },
  });
  const xml = generateInvoiceXml(restaurantInvoice);
  Bun.write("invoice.xml", xml);
  const signedXML = await signXml(
    "sign.p12",
    process.env.SIGN_PASSWORD!,
    "invoice.xml"
  );
  Bun.write("invoice-signed.xml", signedXML);
} catch (e) {
  console.error(e);
}
