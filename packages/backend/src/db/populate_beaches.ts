import { db, client } from "./index.ts";
import { beaches } from "./schema.ts";


const existing_beach = await db
  .select({ id: beaches.id })
  .from(beaches)
  .limit(1);

if (existing_beach.length > 0) {
  console.log("A tabela de praias já está populada.");
  await client.end();
  process.exit(0);
}

const URLS = {
  CETESB:
    "https://servicos.cetesb.sp.gov.br/arcgis/rest/services/QUALIPRAIA/CETESB_QUALPRAIA/MapServer/0/query", 
  IBGE:
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios",
};

const SELECTED_MVP_BEACHES = [
  "ITAMAMBUCA",
  "VERMELHA DO NORTE",
  "GUAECÁ",
  "FÉLIX",
  "VERMELHA",
  "TONINHAS",
  "MARESIAS - PRAÇA DO SURF",
  "CAMBURI",
  "JUQUEÍ-R. CRISTIANA",
  "TOMBO",
]; // Optamos por popular apenas 10 praias de São Paulo para o MVP. Essa é a lista.

type Municipality = {
  id: number;
  nome: string;
};

type CetesbBeach = {
  properties: {
    Município: string;
    Local: string;
    QLAT: number | null;
    QLONG: number | null;
  };
};

const municipalities_data = await fetch(URLS.IBGE).then(
  (response) => response.json(),
) as Municipality[];

const cetesb_params = new URLSearchParams({
  where: "1=1",
  outFields: "*",
  returnGeometry: "false",
  f: "geojson",
});

const cetesb_data = await fetch(
  `${URLS.CETESB}?${cetesb_params}`,
).then((response) => response.json()) as {
  features: CetesbBeach[];
};

const features_with_coordinates = cetesb_data.features.filter(
  ({ properties }) =>
    properties.QLAT !== null &&
    properties.QLONG !== null,
);

const values = features_with_coordinates.filter(({ properties }) => SELECTED_MVP_BEACHES.includes(properties.Local)).map(({ properties }) => {
  const municipality = municipalities_data.find(
    ({ nome }) =>
      nome.localeCompare(properties.Município, "pt-BR", {
        sensitivity: "base",
      }) === 0,
  );

  if (!municipality) {
    throw new Error(
      `Município não encontrado: ${properties.Município}`,
    );
  }

  return {
    name: properties.Local,
    ibgeCode: String(municipality.id),
    latitude: properties.QLAT!,
    longitude: properties.QLONG!,
  };
});

await db.insert(beaches).values(values);

console.log(`${values.length} praias inseridas.`);

await client.end();