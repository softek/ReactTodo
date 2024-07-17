using NJsonSchema;
using NJsonSchema.Generation;

namespace ReactTodo.Server.NSwag;

public class MarkAsRequiredIfNonNullableSchemaProcessor : ISchemaProcessor
{
    public void Process(SchemaProcessorContext context)
    {
        var props = context.Schema.AllOf.Any()
            ? context.Schema.ActualProperties
            : context.Schema.Properties.AsReadOnly();

        foreach (var (_, prop) in props)
            if (!prop.IsNullable(SchemaType.OpenApi3))
                prop.IsRequired = true;
    }
}
