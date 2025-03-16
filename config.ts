const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

const QUERY_PARAMS = {
    fields: 'items(id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/description,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)'
}

const NO_THUMBNAIL = "http://books.google.com/books/content?id=FOHtDwAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

export { BOOKS_URL, QUERY_PARAMS, NO_THUMBNAIL}