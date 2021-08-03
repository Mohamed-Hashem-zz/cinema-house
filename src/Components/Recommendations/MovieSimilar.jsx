import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';

const handleDragStart = (e) => e.preventDefault();

const MovieSimilar = ({ movie, goToMovieAbout }) => {

    const [loading, setLoading] = useState(false);

    const [credits, setCredits] = useState([]);

    const items = React.Children.toArray
        (
            credits?.map((poster) => {
                return poster.poster_path ? (
                    <div className="item card card-body  mb-3" onClick={() => goToMovieAbout(poster)}>
                        <div className="text-center position-relative">
                            <div className="captionLayer overflow-hidden mb-2  carouselItem">
                                <img src={`https://image.tmdb.org/t/p/original${poster.poster_path}`} width="100%" height="300" className="carouselItem__img" alt={poster.title === "undefined" ? poster.name : poster.title} title={poster.title === "undefined" ? poster.name : poster.title} onDragStart={handleDragStart} />
                                <div className="item-layer position-absolute w-100 h-100"></div>
                            </div>
                            <span className={`${poster.vote_average >= 7 ? "vote vote1" : "vote vote2"}`}>{poster.poster_path !== null ? Number(poster.vote_average).toFixed(1) : ""}</span>
                            <b>{poster.title}</b>
                        </div>
                    </div>
                ) : null
            })
        )

    const responsive = {
        0: {
            items: 1
        },
        512: {
            items: 3
        },
        1024: {
            items: 5
        }
    };

    const fetchImages = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=0c46ad1eb5954840ed97f5e537764be8`)
            .then((response) => {
                if (response.data.results.length > 0) {
                    setLoading(true);
                    setCredits(response.data.results);
                }
            })
            .catch(function (error) {
                console.log(error);
                setCredits([])
            })
    }

    useEffect(() => {
        fetchImages();

        return (() => {
            setLoading(false);
            setCredits([]);
        })             // eslint-disable-next-line
    }, [movie]);

    return loading ? (
        <>
            <div className="my-4">
                <div className="w-100 line my-5"></div>
                <div className="item text-center my-3">
                    <h3>Similar Movie as <b className="text-info">{movie.title ? movie.title : movie.name}</b></h3>
                </div>

                <AliceCarousel autoPlay responsive={responsive} infinite autoPlayInterval={2000} disableDotsControls mouseTracking items={items} />
            </div>
        </>
    ) : null;
}

export default MovieSimilar;