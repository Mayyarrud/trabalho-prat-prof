type ExemploProps = {
  nomes: string[];
};

export function Exemplo({ nomes }: ExemploProps) {
  return (
    <ul>
      {nomes.map((nome) => (
        <li key={nome}>Nome: {nome}</li>
      ))}
    </ul>
  );
}