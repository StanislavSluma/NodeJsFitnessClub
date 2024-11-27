import {getCatFact} from "../api/CatFact.js";
import {getDogPhoto} from "../api/DogPhoto.js";
import {useEffect, useState} from "react";
import TimeZoneComponent from "./TimeZoneComponent.jsx";

const HomeComponent = () => {
    const [catFact, setCatFact] = useState(null);
    const [dogPhoto, setDogPhoto] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    const scaleValue = 1 + scrollY / 500

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const bgText = document.getElementById('text-bg');

        bgText.style.scale = `${scaleValue}`;
        bgText.style.right = `${scrollY/scaleValue/0.7}px`;
    }, [scrollY, scaleValue])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const getCatRandomFact = async () => {
            const data = await getCatFact();
            if (data) setCatFact(data);
        }
        const getDogRandomPhoto = async () => {
            const data = await getDogPhoto();
            if (data) setDogPhoto(data);
        }

        getCatRandomFact();
        getDogRandomPhoto();
        console.log(catFact, dogPhoto);

    }, []);

    return (
        <div className="home-component">
            <section className="home-component">
                <h1 id="text-bg"> Добро пожаловать в фитнес клуб! </h1>
            </section>
            <section className="timr-zone">
                <TimeZoneComponent/>
            </section>
            <section className="api">
            <section className="cat-fact">
                    <h1 className="fact-title">Cat Fact</h1>
                    {catFact ? (
                        <div className="cat-fact-info">
                            {catFact.fact}
                        </div>
                    ) : (
                        <p>Loading cat random fact</p>
                    )}
                </section>

                <section className="dog-photo">
                    <h1 className="photo-title">Pretty Dog Photo!</h1>
                    {dogPhoto ? (
                        <div className="random-dog-photo">
                            <img src={dogPhoto.message}/>
                        </div>
                    ) : (
                        <p>Loading random dog photo</p>
                    )}
                </section>
            </section>

        </div>
    )
};
export default HomeComponent;