import { Button, Modal, message } from "antd";
import { taskApi, categoryApi, type Category } from "./api/api";
import React, { useEffect, useState } from "react";
import type { CheckboxGroupProps } from "antd/es/checkbox";

export const detailModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [priority, setPriority] = useState("Low");
  const [categoryId, setCategoryId] = useState(1);

  return (
    <div>
      <Modal></Modal>
    </div>
  );
};
