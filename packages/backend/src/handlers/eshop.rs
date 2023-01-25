use tonic::{Request, Response, Status};

use super::grpc::*;

#[derive(Default)]
pub struct EshopHandler {}

#[tonic::async_trait]
impl eshop_service_server::EshopService for EshopHandler {
    async fn get_book_by_id(
        &self,
        _: Request<GetBookByIdRequest>,
    ) -> Result<Response<Book>, Status> {
        let chapters = vec![
            Chapter {
                id: "jedna".to_string(),
                chapter_name: "jedna".to_string(),
                start: 0,
            },
            Chapter {
                id: "dva".to_string(),
                chapter_name: "dva".to_string(),
                start: 1,
            },
            Chapter {
                id: "tri".to_string(),
                chapter_name: "tri".to_string(),
                start: 2,
            },
        ];

        let authors = vec![
            Author {
                id: "jedna".to_string(),
                name: "jedna".to_string(),
            },
            Author {
                id: "dva".to_string(),
                name: "dva".to_string(),
            },
            Author {
                id: "tri".to_string(),
                name: "tri".to_string(),
            },
        ];

        Ok(Response::new(Book {
            id: String::from("prdel"),
            is_owned: false,
            chapters,
            authors,
            length: 420_u64,
            name: String::from("epic book name"),
            description: String::from("desc"),
            file_url: String::from("file url"),
            cover_url: String::from("cover url"),
            price: 69_u64,
            isbn: String::from("IIII I  II"),
        }))
    }

    async fn get_author_by_id(
        &self,
        _: Request<GetAuthorByIdRequest>,
    ) -> Result<Response<Author>, Status> {
        Ok(Response::new(Author {
            id: String::from("mock id"),
            name: String::from("mock name"),
        }))
    }

    async fn get_user_by_id(
        &self,
        _: Request<GetUserByIdRequest>,
    ) -> Result<Response<User>, Status> {
        Ok(Response::new(User {
            id: String::from("mock id"),
            name: String::from("this mock user"),
            studio_access: true,
        }))
    }

    async fn get_books(&self, _: Request<GetBooksRequest>) -> Result<Response<Books>, Status> {
        Ok(Response::new(Books {
            total: 1,
            books: vec![Book {
                id: String::from("prdel"),
                is_owned: false,
                chapters: vec![],
                authors: vec![],
                length: 420_u64,
                name: String::from("epic book name"),
                description: String::from("desc"),
                file_url: String::from("file url"),
                cover_url: String::from("cover url"),
                price: 69_u64,
                isbn: String::from("IIII I  II"),
            }],
        }))
    }

    async fn get_authors(
        &self,
        _: Request<GetAuthorsRequest>,
    ) -> Result<Response<Authors>, Status> {
        Ok(Response::new(Authors {
            total: 1,
            authors: vec![Author {
                id: String::from("mock id"),
                name: String::from("mock name"),
            }],
        }))
    }

    async fn get_my_books(&self, _: Request<GetMyBooksRequest>) -> Result<Response<Books>, Status> {
        Ok(Response::new(Books {
            total: 1,
            books: vec![Book {
                id: String::from("prdel"),
                is_owned: false,
                chapters: vec![],
                authors: vec![],
                length: 420_u64,
                name: String::from("epic book name"),
                description: String::from("desc"),
                file_url: String::from("file url"),
                cover_url: String::from("cover url"),
                price: 69_u64,
                isbn: String::from("IIII I  II"),
            }],
        }))
    }
}
