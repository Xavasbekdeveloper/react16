import React, { useRef, useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { DATA } from "@/static";

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || DATA
  );
  const [status, setStatus] = useState(null);

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.filter((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      let filteredData = data.filter((item) => item.id !== id);
      setData(filteredData);
      localStorage.setItem("data", JSON.stringify(filteredData));
    }
  };

  const filterByStatus = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <div key={el.id} className="kanban__item">
          <p>{el.title}</p>
          <p className="kanban__commit">{el.desc}</p>
          <div className="kanban__status">
            <select
              name=""
              id=""
              value={el.status}
              onChange={(e) => handleStatusChange(el.id, e.target.value)}
            >
              <option value="ready">Ready</option>
              <option value="working">Working</option>
              <option value="stuck">Stuck</option>
              <option value="done">Done</option>
            </select>
            <span>9:06</span>
            <div className="kanban__delete-btn">
              <button onClick={() => handleDelete(el.id)}>
                <RiDeleteBin6Fill />
              </button>
            </div>
          </div>
        </div>
      ));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    const newItem = {
      id,
      title: title.current.value,
      desc: desc.current.value,
      status,
    };
    const updatedData = [...data, newItem];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));

    title.current.value = "";
    desc.current.value = "";

    setStatus(null);
  };

  const readyItems = filterByStatus("ready");
  const workingItems = filterByStatus("working");
  const stuckItems = filterByStatus("stuck");
  const doneItems = filterByStatus("done");

  return (
    <section>
      <div className="container">
        <div className="kanban">
          {/* header */}
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          {/* modal */}
          <div className={`modal ${status ? "show__modal" : ""}`}>
            {/* form */}
            <form onSubmit={handleCreate} className="modal__form" action="">
              <input
                required
                ref={title}
                type="text"
                placeholder="Enter Title"
              />
              <input
                required
                ref={desc}
                type="text"
                placeholder="Enter Description"
              />
              <button>Create</button>
            </form>
          </div>
          {/* wrapper */}
          <div className="kanban__wrapper">
            {/* 1 */}
            <div className="kanban__box ready">
              <div className="kanban__heading">
                <p>Ready to start / {readyItems.length}</p>
              </div>
              <div className="kanban__block">
                {readyItems.length ? (
                  readyItems
                ) : (
                  <span className="kanban__empty">Empty</span>
                )}
              </div>
              <button
                onClick={() => setStatus("ready")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            {/* 2 */}
            <div className="kanban__box working">
              <div className="kanban__heading">
                <p>Working to start / {workingItems.length}</p>
              </div>
              <div className="kanban__block ">
                {workingItems.length ? (
                  workingItems
                ) : (
                  <span className="kanban__empty">Empty</span>
                )}
              </div>
              <button
                onClick={() => setStatus("working")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            {/* 3 */}
            <div className="kanban__box stuck">
              <div className="kanban__heading">
                <p>Stuck to start / {stuckItems.length}</p>
              </div>
              <div className="kanban__block">
                {stuckItems.length ? (
                  stuckItems
                ) : (
                  <span className="kanban__empty">Empty</span>
                )}
              </div>
              <button
                onClick={() => setStatus("stuck")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            {/* 4 */}
            <div className="kanban__box done">
              <div className="kanban__heading">
                <p>Done to start / {doneItems.length}</p>
              </div>
              <div className="kanban__block">
                {doneItems.length ? (
                  doneItems
                ) : (
                  <span className="kanban__empty">Empty</span>
                )}
              </div>
              <button
                onClick={() => setStatus("done")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
