namespace EnterpriseFabric.Api.Features.Customers;

public record Customer(
    long Id,
    string FirstName,
    string LastName,
    string Email,
    string Company,
    string JobTitle,
    string City,
    string Country,
    string Phone,
    string Status,
    DateTimeOffset CreatedAt);
