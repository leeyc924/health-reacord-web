import React from 'react';
import { MdRemoveCircleOutline as DeleteIcon } from 'react-icons/md';
import { IForm } from '../../libs/type/form';
import EditBox from './EditBox';

interface CardProps extends IForm {
  onRemove: (id: string) => void;
  onEdit: (form: IForm) => void;
}

const Card = ({ id, day, title, allCnt, setList, onRemove, onEdit }: CardProps) => {
  return (
    <div style={{ position: 'relative' }} className="flex flex-col gap-2 bg-lime-300 rounded-xs shadow-lg p-4">
      <div className="px-1">
        <span>{day}</span>
      </div>
      <div className="flex">
        <div className="px-1">
          <span>{title}</span>
        </div>
      </div>
      <div className="flex">
        <div className="px-1">
          <span>{setList}</span>
        </div>
        <div className="px-1 font-bold">
          <span>총: {allCnt}</span>
        </div>
      </div>
      <div className="flex gap-2" style={{ position: 'absolute', top: 20, right: 20 }}>
        <EditBox initForm={{ id, day, title, allCnt, setList }} onEdit={onEdit} />
        <button onClick={e => onRemove?.(id)}>
          <DeleteIcon color="#ef4444" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Card;
