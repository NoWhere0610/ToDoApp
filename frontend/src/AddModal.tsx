import {
  Input,
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Radio,
  Flex,
  message,
} from "antd";
import { taskApi, categoryApi, type Category } from "./api/api";
import React, { useEffect, useState } from "react";
import type { CheckboxGroupProps } from "antd/es/checkbox";

const { TextArea } = Input;

interface AddModalProps {
  onTaskAdded?: () => void;
}

export const AddModal: React.FC<AddModalProps> = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [priority, setPriority] = useState("Low");
  const [categoryId, setCategoryId] = useState(1);

  const priorityOptions: CheckboxGroupProps<string>["options"] = [
    { label: "Thấp", value: "Low" },
    { label: "Trung bình", value: "Medium" },
    { label: "Cao", value: "High" },
  ];

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const data = await categoryApi.getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setExpireDate(null);
    setTime(null);
    setPriority("Low");
    setCategoryId(1);
  };

  const handleOk = async () => {
    if (!title.trim()) {
      message.error("Vui lòng nhập tiêu đề nhiệm vụ!");
      return;
    }

    setConfirmLoading(true);

    const formattedTime = time ? `${time}:00` : null;

    const newTaskPayload = {
      title: title,
      description: description || null,
      priority: priority,
      expire_Date: expireDate,
      time: formattedTime,
      status: false,
      categoryId: categoryId,
    };

    try {
      await taskApi.createTask(newTaskPayload);
      message.success("Thêm nhiệm vụ thành công!");
      setOpen(false);
      resetForm();
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error(error);
      message.error("Không thể thêm nhiệm vụ. Vui lòng thử lại!");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        + Thêm nhiệm vụ mới
      </Button>
      <Modal
        title="Thêm nhiệm vụ mới"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Lưu lại"
        cancelText="Hủy bỏ"
        styles={{
          mask: {
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          },
        }}
      >
        <p>Nhập tiêu đề*</p>
        <Input
          placeholder="Nhập tiêu đề cho công việc"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <p>Mô tả chi tiết</p>
        <TextArea
          rows={4}
          placeholder="Thêm ghi chú hoặc chi tiết cho công việc này"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextArea>
        <div className="flex justify-between">
          <div>
            <p>Ngày hết hạn</p>
            <DatePicker
              onChange={(date, dateString) => {
                setExpireDate(dateString);
              }}  
            ></DatePicker>
          </div>
          <div>
            <p>Thời gian</p>
            <TimePicker
              format="HH:mm"
              onChange={(time, timeString) => {
                setTime(timeString);
              }}
            ></TimePicker>
          </div>
        </div>

        <p>Mức độ ưu tiên</p>
        <Flex>
          <Radio.Group
            options={priorityOptions}
            defaultValue={"Low"}
            optionType="button"
            buttonStyle="solid"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </Flex>
        <p>Danh mục</p>
        <Flex>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <Radio key={cat.id} value={cat.id}>
                {cat.name}
              </Radio>
            ))}
          </Radio.Group>
        </Flex>
      </Modal>
    </div>
  );
};