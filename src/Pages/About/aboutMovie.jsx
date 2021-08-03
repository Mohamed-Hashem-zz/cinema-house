import React, { Component } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import MovieShow from './../../Components/ShowImages/MovieShow';
import MovieRecommendations from './../../Components/Recommendations/MovieRecommendations';
import MovieActors from './../../Components/Actors/MovieActors';
import MovieSimilar from '../../Components/Recommendations/MovieSimilar';
import MovieRating from './../../Components/Rating/MovieRating';

export default class aboutMovie extends Component {
    isLoading = false;

    constructor() {
        super();
        this.state = {
            iFrame: null,
            moviesDetails: null,
            movie: null,
        }
        window.scrollTo(0, 0);
    }

    MoviesDetails = async (movie) => {

        if (this.props.location.pathname !== undefined) {
            this.state.movie = movie
            localStorage.removeItem('movie');
            localStorage.setItem('movie', this.state.movie)
        }
        else
            this.state.movie = localStorage.getItem('movie');

        await axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie.id}?api_key=0c46ad1eb5954840ed97f5e537764be8`).then((res) => {

            this.setState({ moviesDetails: res.data })
            this.isLoading = true

        }).catch((err) => this.setState({ moviesDetails: null }))
    }

    IFrame = async (item) => {

        await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=0c46ad1eb5954840ed97f5e537764be8`).then((res) => {

            let { data } = res;

            this.setState({ iFrame: data.results[0].key })

            this.isLoading = true

        }).catch((err) => this.setState({ iFrame: null }));
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.MoviesDetails(this.props.location.state);

        setTimeout(() => this.IFrame(this.props.location.state), 300);
    }

    componentDidUpdate(prevProps) {

        if (this.props.location.state !== prevProps.location.state) {

            this.setState({ movie: this.props.location.state })

            this.MoviesDetails(this.props.location.state);

            setTimeout(() => this.IFrame(this.props.location.state), 300);
        }
    }

    componentWillUnmount() {
        this.isLoading = false
        clearTimeout();
    }

    goToPersonAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutPerson/${actor.id}`, actor)
    }

    goToMovieAbout = (item) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutMovie/${item.id}`, item)
    }

    goToTvAbout = (item) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutTv/${item.id}`, item)
    }

    torrentDownload = async (query) => {

        await axios.get(`https://yts.mx/api/v2/list_movies.json?page=1&query_term=${query}`).then((res) => {

            window.location = res.data.data.movies[0].torrents[0].url;

        }).catch((err) => {
            console.log(err);
        });
    }

    render() {

        return (
            <>
                <Navbar />
                <ScrollToTop />

                <section style={{ minHeight: "71vh" }} >

                    <div className="container about">

                        {
                            this.isLoading ?
                                (<div className="row  d-flex justify-content-start">

                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">

                                        <div className="text-center position-relative mb-2">

                                            <div className="overflow-hidden mb-3">
                                                <img src={`https://image.tmdb.org/t/p/original/${this.state.moviesDetails.poster_path}`} className="w-100 h-100" alt={this.state.moviesDetails.title !== "undefined" ? this.state.moviesDetails.title : this.state.moviesDetails.name} title={this.state.moviesDetails.title === "undefined" ? this.state.moviesDetails.name : this.state.moviesDetails.title} />
                                                <div className="item-layer position-absolute w-100 h-100"></div>

                                            </div>

                                            <b>{this.state.moviesDetails.title} {this.state.moviesDetails.name}</b>
                                            <span className={`${this.state.moviesDetails.vote_average >= 7 ? "vote vote1" : "vote vote2"}`}>{this.state.moviesDetails.poster_path !== null ? this.state.moviesDetails.vote_average : ""}</span>
                                        </div>
                                    </div>

                                    <div className=" w-65 col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">

                                        <table className="table table-borderless" >

                                            <thead>
                                                <tr>
                                                    <th style={{ "width": "180px" }}>Name </th>
                                                    <td> {this.state.moviesDetails.title ? this.state.moviesDetails.title : this.state.moviesDetails.name}</td>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th>Revenue</th>
                                                    <td>$ {this.state.moviesDetails.revenue} </td>
                                                </tr>

                                                <tr>
                                                    <th>Homepage To Site</th>
                                                    <td><a href={this.state.moviesDetails.homepage ? this.state.moviesDetails.homepage : `/about`} target="_blank" rel="noreferrer" className="text-decoration-none font-weight-bold">{this.state.moviesDetails.homepage ? "Homepage" : "Not Supported"} </a> </td>
                                                </tr>

                                                <tr>
                                                    <th>Genres</th>
                                                    <td>
                                                        {
                                                            React.Children.toArray
                                                                (
                                                                    this.state.moviesDetails.genres.slice(0, 2).map((genre) => {
                                                                        return (
                                                                            <span className="genres" key={Math.random()}>{genre.name}</span>
                                                                        )
                                                                    }
                                                                    )
                                                                )
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Language</th>
                                                    <td> {this.state.moviesDetails.original_language}</td>
                                                </tr>

                                                <tr>
                                                    <th>Release Date</th>
                                                    <td> {this.state.moviesDetails.release_date != null ? this.state.moviesDetails.release_date : "Not Release"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Popularity</th>
                                                    <td> {this.state.moviesDetails.popularity}</td>
                                                </tr>
                                                <tr>
                                                    <th>Media Type</th>
                                                    <td> Movie </td>
                                                </tr>
                                                <tr>
                                                    <th>Vote Average</th>
                                                    <td> {this.state.moviesDetails.vote_average}</td>
                                                </tr>
                                                <tr>
                                                    <th>Vote Count</th>
                                                    <td> {this.state.moviesDetails.vote_count}</td>
                                                </tr>

                                            </tbody>

                                            <tfoot>
                                                <tr>
                                                    <th>overview</th>
                                                    <td> {this.state.moviesDetails.overview.substr(0, 250)}</td>
                                                </tr>
                                            </tfoot>

                                        </table>

                                        <div>
                                            <button className="btn btn-info mr-3" onClick={() => this.torrentDownload(this.state.moviesDetails.title ? this.state.moviesDetails.title : this.state.moviesDetails.name)} >Download</button>
                                            <span className="text-danger font-weight-bold">Torrents Only !</span>
                                        </div>

                                    </div>

                                    {
                                        this.state.iFrame ? (
                                            <>

                                                <div className="w-100 line my-5"></div>

                                                <div className="col-lg-8 col-md-10 col-sm-12 mx-auto ">
                                                    <h1 className="text-center mb-4"> Trial For <b className="text-info"> {this.state.moviesDetails.title ? this.state.moviesDetails.title : this.state.moviesDetails.name}</b></h1>
                                                    <div>
                                                        <iframe width="100%" height="300px" src={`https://www.youtube-nocookie.com/embed/${this.state.iFrame}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null
                                    }

                                </div>) : (<div className="Loader" >
                                    <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} />
                                </div>)
                        }

                        <MovieShow poster={this.props.location.state} />

                        <MovieActors actor={this.props.location.state} goToPersonAbout={this.goToPersonAbout} />

                        <MovieSimilar movie={this.props.location.state} goToMovieAbout={this.goToMovieAbout} />

                        <MovieRecommendations movie={this.props.location.state} goToMovieAbout={this.goToMovieAbout} />

                        <MovieRating rate={this.props.location.state} />

                    </div>

                </section >

            </>
        )
    }
}
