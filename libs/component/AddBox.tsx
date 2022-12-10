import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import {
  MdRemoveCircleOutline as DeleteIcon,
  MdAddCircleOutline as AddIcon,
  MdEditNote as EditIcon,
} from 'react-icons/md';
import { v4 } from 'uuid';

import { initialForm } from '../../libs/constants/fake';
import { IForm } from '../../libs/type/form';
import Card from '../../libs/component/Card';

const AddBox = ({ onAdd }: { onAdd: (form: Omit<IForm, 'id'>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    day: '',
    title: '',
    allCnt: '',
    setList: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  useEffect(() => {
    const allCnt = String(form.setList.split(', ').reduce((sum: number, cur) => sum + Number(cur), 0));
    setForm(form => ({ ...form, allCnt }));
  }, [form.setList]);

  return (
    <div className="ml-4" style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(true)}>
        <AddIcon color="#1e40af" size={25} />
      </button>
      {isOpen && (
        <form
          style={{ position: 'absolute', width: 485, zIndex: 2, left: -160 }}
          className="w-full flex flex-col gap-2 bg-blue-200 rounded-xs shadow-lg p-4"
          onSubmit={e => {
            e.preventDefault();
            if (confirm('추가하시겠습니까?')) {
              onAdd(form);
            }
            setIsOpen(false);
          }}
        >
          <div className="px-1">
            일자
            <input
              className="w-full border border-solid border-lime-900"
              value={form.day}
              name="day"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="px-1">
            종류
            <select
              className="w-full border border-solid border-lime-900"
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
              className="w-full border border-solid border-lime-900"
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
              추가
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
    </div>
  );
};

export default AddBox;
