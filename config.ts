const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const QUERY_PARAMS = {
    fields: 'items(id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/description,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)'
}

export { BASE_URL, QUERY_PARAMS}