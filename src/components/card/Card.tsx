import { CardInterface } from '../../interface/CardInterface';
import './style.css';

interface CardsInput {
  card: CardInterface;
}

//type = hjerter, ruter, kløver, spar
const Card = ({card}: CardsInput) => {

  return (
    <div  className={`card ${card.type}`} >
        <strong>{card.number}</strong>
    </div>
  );
};

export default Card;
