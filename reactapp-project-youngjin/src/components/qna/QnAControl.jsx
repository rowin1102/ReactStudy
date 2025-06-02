import QnAModalBtn from './QnAModalBtn';
import QnAModalWindow from './QnAModalWindow';
import QnAList from './QnAList';

export default function QnAControl(props) {
  const {formatDate, id} = props;


  return (<>
    <div className="container mt-4">
      <QnAModalBtn />
      <QnAModalWindow id={id} />
      <QnAList formatDate={formatDate} />
    </div>
  </>); 
}