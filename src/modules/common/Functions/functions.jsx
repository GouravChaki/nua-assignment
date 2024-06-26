import { paginatedBooks } from "../APIFunctions/allBooks";
import { authorSpecificBooks } from "../APIFunctions/authorBooks";
import { showToastMessage } from "./toast";

export const handleChange = async (row, setLoading, state, setState, page) => {
  try {
    setLoading(true);
    const booksData = await paginatedBooks({
      limit: row,
      page: page,
      offset: (page - 1) * row + 1,
    });
    if (booksData.success) {
      setState({
        ...state,
        initialized: true,
        allBooks: booksData.data || state.allBooks,
      });
    } else {
      console.error("Failed to fetch data");
      throw "Failed to fetch data";
    }
    setLoading(false);
    return true;
  } catch (error) {
    setLoading(false);
    showToastMessage("error", "Error fetching data", 8000, 1);
    console.error("Error fetching data:", error);
    return false;
  }
};

export const searchBooks = async (
  author,
  row,
  setLoading,
  state,
  setState,
  page
) => {
  try {
    setLoading(true);
    const authorBooks = await authorSpecificBooks({
      author: author,
      limit: row,
      page: page,
      offset: (page - 1) * row + 1,
    });
    if (authorBooks.success) {
      setState({
        ...state,
        initialized: true,
        allBooks: authorBooks.data || state.allBooks,
      });
    } else {
      console.error("Failed to fetch data");
      throw "Failed to fetch data";
    }
    setLoading(false);
    return true;
  } catch (error) {
    setLoading(false);
    showToastMessage("error", "Error fetching data", 8000, 1);
    console.error("Error fetching data:", error);
    return false;
  }
};

export const convertToCSV = (sortedBooks) => {
  const csvData = sortedBooks.map((book) => ({
    Index: book.id,
    "Ratings Average": book.ratings_average,
    "Author Name": book.author_name,
    Title: book.title,
    "First Publish Year": book.first_publish_year,
    Subject: book.subject,
    "Author Birth Date": book.author_birth_date,
    "Author Top Work": book.author_top_work,
  }));
  return csvData;
};