module.exports = (event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: {
      street: event.street,
      number: event.number,
      neighborhood: event.neighborhood,
      city: event.city,
      state: event.state,
      zip_code: event.zip_code,
    },
    created_by: event.created_by,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  });
  