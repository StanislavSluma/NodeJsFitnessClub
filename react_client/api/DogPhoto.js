export const getDogPhoto = async () => {
    const url = `https://dog.ceo/api/breeds/image/random`;
    const response = await fetch(url);

    let dogPhoto = null;
    if (response.ok) {
        dogPhoto = await response.json();
    }
    return dogPhoto;
};