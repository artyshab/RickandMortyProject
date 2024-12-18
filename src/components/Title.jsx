import image from '../assets/Rick_and_Morty.svg';


export default function Title() {
    return (
        <div className="title-container">
            <div className="image">
            <img src={image} alt="Logo" />
            </div>
        </div>
    )
}