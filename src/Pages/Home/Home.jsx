import React, { Component } from 'react';
import Navbar from './../../Components/Navbar/Navbar';
import axios from 'axios';
import ScrollToTop from './../../Components/ScrollToTop/ScrollToTop';

import Loader from 'react-loader-spinner';

export default class Home extends Component {

    controller = new AbortController();

    constructor() {
        super();
        this.state = { movie: [], tv: [], person: [], isLoading: false };

        window.scrollTo(0, 0);
    }

    getTrending = async (mediaType) => {

        this.setState({ isLoading: true });

        await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=0c46ad1eb5954840ed97f5e537764be8`, { signal: this.controller.signal }).then((res) => {

            this.setState({ [mediaType]: res.data.results });

        }).catch((err) => this.setState({ [mediaType]: null }))
    }

    componentDidMount() {
        this.getTrending("movie");
        this.getTrending("tv");
        this.getTrending("person");
    }

    goToMovieAbout = (movie) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutMovie/${movie.id}`, movie);
    }

    goToTvAbout = (series) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutTv/${series.id}`, series);
    }

    goToPersonAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutPerson/${actor.id}`, actor)
    }

    componentWillUnmount() {
        this.setState({ isLoading: false });
        this.controller.abort();
    }

    render() {
        return (
            <>
                <Navbar />

                <ScrollToTop />

                <div className="container home" style={{ minHeight: "71vh" }}>

                    {/*////////////////////////////////  Movies    //////////////////////////////////////*/}

                    {
                        this.state.isLoading ? (

                            <div className="row">
                                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                                    <div className="item">
                                        <div className="w-25 line mb-3"></div>

                                        <h1 className="mr-4">Trending Movies to Watch now</h1>
                                        <p className="secondFontColor">Most Watched Movies</p>

                                        <div className="w-100 line mb-4"></div>
                                    </div>
                                </div>

                                {
                                    React.Children.toArray(  // that handle a unique key itself

                                        this.state.movie.slice(0, 10).map((movie) => {

                                            return movie.poster_path ? (
                                                <div className="item col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2 card card-body" onClick={() => this.goToMovieAbout(movie)}>
                                                    <div className="text-center position-relative">

                                                        <div className="captionLayer overflow-hidden mb-2">
                                                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="100%" height="250" alt={movie.title} title={movie.title} />
                                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                                        </div>

                                                        <b>{movie.title} {movie.name}</b>
                                                        <span className={`vote ${movie.vote_average >= 7 ? "vote1" : "vote2"} `}>{movie.vote_average}</span>
                                                    </div>
                                                </div>
                                            ) : null
                                        })
                                    )
                                }

                            </div>) : (<div className="Loader" >
                                <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>)
                    }


                    {/*////////////////////////////////  TV    //////////////////////////////////////*/}

                    {
                        this.state.isLoading ? (

                            <div className="row my-3">
                                <div className="col-md-4 col-sm-12  d-flex justify-content-center align-items-center">
                                    <div className="item">
                                        <div className="w-25 line mb-3"></div>

                                        <h1 className="mr-5">Trending <br />Series to Watch now</h1>
                                        <p className="secondFontColor">Most Watched Series </p>

                                        <div className="w-100 line mb-4"></div>
                                    </div>
                                </div>

                                {
                                    React.Children.toArray(  // that handle a unique key itself
                                        this.state.tv.slice(0, 10).map((series) => {
                                            return series.poster_path ? (
                                                <div className="item col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2 card card-body" onClick={() => this.goToTvAbout(series)}>
                                                    <div className="text-center position-relative">

                                                        <div className="captionLayer overflow-hidden mb-2">
                                                            <img src={`https://image.tmdb.org/t/p/original${series.poster_path}`} width="100%" height="250" alt={series.title === "undefined" ? series.name : series.title} title={series.title === "undefined" ? series.name : series.title} />
                                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                                        </div>

                                                        <b>{series.title} {series.name}</b>
                                                        <span className={`vote ${series.vote_average >= 7 ? "vote1" : "vote2"} `}>{series.vote_average}</span>
                                                    </div>
                                                </div>
                                            ) : null
                                        }))
                                }

                            </div>) : (<div className="Loader" >
                                <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>)
                    }

                    {/*////////////////////////////////  People   //////////////////////////////////////*/}

                    {
                        this.state.isLoading ? (

                            <div className="row mt-3">
                                <div className="col-md-4 col-sm-12  d-flex justify-content-center align-items-center">
                                    <div className="item">
                                        <div className="w-25 line mb-3"></div>

                                        <h1 className="mr-5">Trending <br /> Actors and Actress</h1>
                                        <p className="secondFontColor">Most Popular Actors and Actress</p>

                                        <div className="w-100 line mb-4"></div>
                                    </div>

                                </div>

                                {
                                    React.Children.toArray(  // that handle a unique key itself
                                        this.state.person.slice(0, 10).map((actor) => {

                                            return actor.profile_path ? (

                                                <div className="item col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2 card card-body" onClick={() => this.goToPersonAbout(actor)} >
                                                    <div className="text-center position-relative">
                                                        <div className="captionLayer overflow-hidden mb-2">
                                                            <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} width="100%" height="250" alt={actor.title === "undefined" ? actor.name : actor.title} title={actor.title === "undefined" ? actor.name : actor.title} />
                                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                                        </div>

                                                        <b>{actor.title} {actor.name}</b>
                                                    </div>
                                                </div>
                                            ) : null
                                        }))
                                }

                            </div>) : (<div className="Loader" >
                                <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>)
                    }
                </div>
            </>
        )
    }
}