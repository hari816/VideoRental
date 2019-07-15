import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: 1,
      content: movie => (
        <Like onClick={() => this.props.onLike(movie)} like={movie.liked} />
      )
    },
    {
      key: 2,
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger "
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
