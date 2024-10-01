import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector } from '../../services/store';
import './tooltip.css';
import { currientDate } from '../../utils/currient-date';

const ToolTip = () => {
  const collection = useAppSelector(selectCollection);

  return (
    <div className='tooltip-container'>
      <span className='text'>▽</span>
      <span className='tooltip'>
        <div className='item'> remain: {collection.length}</div>
        <div className='item'>
          today:{' '}
          {localStorage.getItem(`effortCounterInStorage-${currientDate}`)
            ? localStorage.getItem(`effortCounterInStorage-${currientDate}`)
            : 0}
        </div>
      </span>
    </div>
  );
};

export default ToolTip;
