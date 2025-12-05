interface SchemaProps {
  schema: object;
}

const Schema: React.FC<SchemaProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};

export default Schema;
