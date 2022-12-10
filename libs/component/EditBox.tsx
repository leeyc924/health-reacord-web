import React, { useCallback, useEffect, useState } from 'react';
import {
  MdRemoveCircleOutline as DeleteIcon,
  MdAddCircleOutline as AddIcon,
  MdEditNote as EditIcon,
} from 'react-icons/md';

import { IForm } from '../../libs/type/form';

const EditBox = ({ onEdit, initForm }: { onEdit: (form: IForm) => void; initForm: IForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<IForm>(initForm);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  useEffect(() => {
    const allCnt = String(form.setList.split(', ').reduce((sum: number, cur) => sum + Number(cur), 0));
    setForm(form => ({ ...form, allCnt }));
  }, [form.setList]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <EditIcon color="#30a1b8" size={20} />
      </button>
      {isOpen && (
        <form
          id={form.id}
          style={{ position: 'absolute', width: 465, zIndex: 2, left: -395 }}
          className="w-full flex flex-col gap-2 bg-gray-300 rounded-xs shadow-lg p-4"
          onSubmit={e => {
            e.preventDefault();
            if (confirm('수정하시겠습니까?')) {
              onEdit(form);
              setIsOpen(false);
            }
          }}
        >
          <div className="px-1">
            일자
            <input
              className="w-full border border-solid border-lime-800"
              value={form.day}
              name="day"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="px-1">
            종류
            <select
              className="w-full border border-solid border-lime-800"
              value={form.title}
              name="title"
              onChange={e => {
                setForm(form => ({ ...form, [e.target.name]: e.target.value }));
              }}
            >
              <option>PushUp</option>
              <option>PullUp</option>
            </select>
          </div>
          <div className="px-1">
            세트
            <input
              className="w-full border border-solid border-lime-800"
              value={form.setList}
              name="setList"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="px-1">
            총<div>{form.allCnt}</div>
          </div>
          <div className="px-1">
            <button type="submit" className="p-2 border border-solid border-lime-600 rounded-xs">
              수정
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 border border-solid border-lime-600 rounded-xs"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditBox;
