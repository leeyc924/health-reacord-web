import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { MdRemoveCircleOutline as DeleteIcon, MdAddCircleOutline as AddIcon } from 'react-icons/md';
import { v4 } from 'uuid';

const RecordPage = () => {
  const [formData, setFormData] = useState([
    { id: '1', day: '08.16', title: 'PushUp', allCnt: '50', setList: '15, 15, 15, 9, 6' },
    { id: '2', day: '08.16', title: 'PullUp', allCnt: '20', setList: '5, 5, 3, 3, 3, 1' },
    { id: '3', day: '08.22', title: 'PushUp', allCnt: '43', setList: '15, 11, 8, 6, 3' },
    { id: '4', day: '08.22', title: 'PullUp', allCnt: '21', setList: '5, 5, 4, 3, 3, 1' },
    { id: '5', day: '08.24', title: 'PushUp', allCnt: '44', setList: '10, 10, 10, 7, 5, 3' },
    { id: '6', day: '08.24', title: 'PullUp', allCnt: '22', setList: '5, 4, 3, 3, 3, 3' },
    { id: '7', day: '08.26', title: 'PushUp', allCnt: '46', setList: '12, 12, 10, 7, 8' },
    { id: '8', day: '08.26', title: 'PullUp', allCnt: '24', setList: '7, 5, 3, 3, 3, 3' },
    { id: '9', day: '08.28', title: 'PushUp', allCnt: '51', setList: '14, 12, 9, 8, 8' },
    { id: '10', day: '08.28', title: 'PullUp', allCnt: '25', setList: '7, 5, 4, 3, 3, 3' },
    { id: '11', day: '08.30', title: 'PushUp', allCnt: '56', setList: '16, 14, 10, 8, 8' },
    { id: '12', day: '08.30', title: 'PullUp', allCnt: '26', setList: '8, 5, 4, 4, 3, 2' },
    { id: '13', day: '09.01', title: 'PushUp', allCnt: '63', setList: '20, 17, 10, 8, 8' },
    { id: '14', day: '09.01', title: 'PullUp', allCnt: '26', setList: '6, 5, 5, 4, 3, 3' },
  ]);

  const handleAdd = useCallback(
    ({ day, title, allCnt, setList }: { day: string; title: string; allCnt: string; setList: string }) => {
      setFormData(formData => formData.concat({ id: v4(), day, title, allCnt, setList }));
    },
    [],
  );

  const handleRemove = useCallback((id: string) => {
    setFormData(formData => formData.filter(data => data.id !== id));
  }, []);

  return (
    <section className="flex flex-col h-full gap-2 p-2">
      <div className="flex gap-2">
        <div className="px-1 basis-10 shrink-0 text-center">
          <span className="text-xs">날짜</span>
        </div>
        <div className="px-1 basis-20 shrink-0 text-center">
          <span className="text-xs">이름</span>
        </div>
        <div className="px-1 grow text-center">
          <span className="text-xs">세트</span>
        </div>
        <div className="px-1 basis-8 shrink-0 text-center">
          <span className="text-xs">총</span>
        </div>
        <div className="px-1 basis-2 shrink-0 basis-4 shrink-0" />
      </div>
      <AddForm onAdd={handleAdd} />
      {formData.map((data, index) => (
        <Row
          key={index}
          id={data.id}
          day={data.day}
          title={data.title}
          allCnt={data.allCnt}
          setList={data.setList}
          onRemove={handleRemove}
        />
      ))}
    </section>
  );
};

interface RowProps {
  id: string;
  day: string;
  title: string;
  allCnt: string;
  setList: string;
  onRemove?: (id: string) => void;
}
const Row = ({ id, day, title, allCnt, setList, onRemove }: RowProps) => {
  return (
    <div className="flex gap-1">
      <div className="px-1 basis-10 shrink-0 text-center">
        <span className="text-xs">{day}</span>
      </div>
      <div className="px-1 basis-20 shrink-0 text-center">
        <span className="text-xs">{title}</span>
      </div>
      <div className="px-1 grow">
        <span className="text-xs">{setList}</span>
      </div>
      <div className="px-1 basis-8 shrink-0 text-center">
        <span className="text-xs">{allCnt}</span>
      </div>
      <div className="flex items-center px-1 basis-4 shrink-0">
        <button className="text-xs" onClick={e => onRemove?.(id)}>
          <DeleteIcon color="#ef4444" size={14} />
        </button>
      </div>
    </div>
  );
};

const AddForm = ({
  onAdd,
}: {
  onAdd: (form: { day: string; title: string; allCnt: string; setList: string }) => void;
}) => {
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
    <form
      className="flex gap-1"
      onSubmit={e => {
        e.preventDefault();
        onAdd(form);
      }}
    >
      <div className="px-1 basis-10 shrink-0 text-center">
        <input
          className="text-xs w-full border border-solid border-lime-400"
          value={form.day}
          name="day"
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="px-1 basis-20 shrink-0 text-center">
        <select
          className="text-xs w-full border border-solid border-lime-400"
          value={form.title}
          name="title"
          onChange={e => {
            setForm(form => ({ ...form, [e.target.name]: e.target.value }))}
          }
        >
          <option>PushUp</option>
          <option>PullUp</option>
        </select>
      </div>
      <div className="px-1 grow">
        <input
          className="text-xs w-full border border-solid border-lime-400"
          value={form.setList}
          name="setList"
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="px-1 basis-8 shrink-0 text-center">
        <span>{form.allCnt}</span>
      </div>
      <div className="flex items-center px-1 basis-4 shrink-0">
        <button type="submit">
          <AddIcon color="#1e40af" size={14} />
        </button>
      </div>
    </form>
  );
};

export async function getServersideProp({ query }: GetServerSidePropsContext) {
  const props = { ...query };
  return {
    props,
  };
}

export default RecordPage;
