import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import MoviesTable from "./moviesTable";
import paginate from "../utils/paginate";
import ListItem from "../common/listitem";
import _ from "lodash";
import propTypes from "prop-types";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    noOfPages: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const ind = movies.indexOf(movie);
    movies[ind] = { ...movies[ind] };
    movies[ind].liked = !movies[ind].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleItem = item => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "AllGenres" }, ...getGenres()];
    this.setState({ movies, genres });
  }
  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      selectedGenre,
      noOfPages,
      sortColumn
    } = this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, noOfPages);
    return { totalCount: filteredMovies.length, data: movies };
  };
  render() {
    const { length } = this.state.movies;
    const { sortColumn } = this.state;
    if (!length)
      return <p style={{ padding: 20 }}>There are no movies in DB</p>;
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListItem
            items={this.state.genres}
            onItemSelect={this.handleItem}
            selectedGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>showing {totalCount} movies</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            totalSize={totalCount}
            noOfPages={this.state.noOfPages}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalSize: propTypes.number.isRequired,
  noOfPages: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired
};

export default Movies;
