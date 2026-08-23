namespace EnterpriseFabric.Api.Features.Customers;

public static class CustomerEndpoints
{
    private const int DefaultPageSize = 20;
    private const int MaxPageSize = 100;

    public static void MapCustomerEndpoints(this WebApplication app)
    {
        app.MapGet("/api/customers", (string? cursor, int? pageSize, CustomerStore store) =>
        {
            var afterId = DecodeCursor(cursor);
            var size = Math.Clamp(pageSize ?? DefaultPageSize, 1, MaxPageSize);

            var (items, hasMore) = store.GetPage(afterId, size);
            var nextCursor = hasMore ? EncodeCursor(items[^1].Id) : null;

            return Results.Ok(new CustomerListResponse(items, nextCursor));
        })
        .WithName("GetCustomers");
    }

    private static long DecodeCursor(string? cursor)
    {
        if (string.IsNullOrEmpty(cursor))
        {
            return 0;
        }

        try
        {
            var decoded = Convert.FromBase64String(cursor);
            var text = System.Text.Encoding.UTF8.GetString(decoded);
            return long.TryParse(text, out var id) ? id : 0;
        }
        catch (FormatException)
        {
            return 0;
        }
    }

    private static string EncodeCursor(long id)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(id.ToString());
        return Convert.ToBase64String(bytes);
    }
}

public record CustomerListResponse(IReadOnlyList<Customer> Items, string? NextCursor);
