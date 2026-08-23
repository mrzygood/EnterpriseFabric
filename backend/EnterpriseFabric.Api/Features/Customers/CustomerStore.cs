using Bogus;

namespace EnterpriseFabric.Api.Features.Customers;

public class CustomerStore
{
    private static readonly string[] Statuses = ["Active", "Inactive", "Prospect"];

    private readonly List<Customer> _customers;

    public CustomerStore()
    {
        long nextId = 0;

        var faker = new Faker<Customer>()
            .CustomInstantiator(f => new Customer(
                Id: Interlocked.Increment(ref nextId),
                FirstName: f.Name.FirstName(),
                LastName: f.Name.LastName(),
                Email: f.Internet.Email(),
                Company: f.Company.CompanyName(),
                JobTitle: f.Name.JobTitle(),
                City: f.Address.City(),
                Country: f.Address.Country(),
                Phone: f.Phone.PhoneNumber(),
                Status: f.PickRandom(Statuses),
                CreatedAt: f.Date.PastOffset(3)));

        // Ids are assigned sequentially above, so the list is already ordered by Id
        // (mirrors an auto-increment primary key in a real database).
        _customers = faker.Generate(50_000);
    }

    public (IReadOnlyList<Customer> Items, bool HasMore) GetPage(long afterId, int pageSize)
    {
        var page = _customers
            .Where(c => c.Id > afterId)
            .Take(pageSize + 1)
            .ToList();

        var hasMore = page.Count > pageSize;
        if (hasMore)
        {
            page.RemoveAt(page.Count - 1);
        }

        return (page, hasMore);
    }
}
