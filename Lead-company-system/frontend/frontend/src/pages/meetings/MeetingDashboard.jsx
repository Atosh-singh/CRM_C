import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Card,
  Button,
  Modal,
  Input,
  DatePicker,
  Row,
  Col,
} from "antd";

import API from "../../api/axios";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MeetingDashboard = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    created: 0,
  });

  const fetchMeetings = async () => {
    const res = await API.get("/meetings/my");

    const data = res.data;

    const formatted = data.map((m) => ({
      title: m.title,
      start: new Date(m.startTime),
      end: new Date(m.endTime),
      meetLink: m.meetLink,
    }));

    setEvents(formatted);

    // 🔥 stats
    const now = new Date();

    setStats({
      total: data.length,
      upcoming: data.filter((m) => new Date(m.startTime) > now).length,
      created: data.filter((m) => m.createdBy).length,
    });
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const createMeeting = async () => {
    await API.post("/meetings", {
      title,
      startTime: time[0],
      endTime: time[1],
    });

    setOpen(false);
    fetchMeetings();
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Meeting Scheduler</h2>

      {/* 🔥 DASHBOARD CARDS */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Meetings">{stats.total}</Card>
        </Col>
        <Col span={8}>
          <Card title="Upcoming">{stats.upcoming}</Card>
        </Col>
        <Col span={8}>
          <Card title="Created by Me">{stats.created}</Card>
        </Col>
      </Row>

      <br />

      <Button type="primary" onClick={() => setOpen(true)}>
        + Schedule Meeting
      </Button>

      <br /><br />

      {/* 📅 CALENDAR */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => window.open(event.meetLink)}
      />

      {/* MODAL */}
      <Modal
        open={open}
        onOk={createMeeting}
        onCancel={() => setOpen(false)}
      >
        <Input
          placeholder="Meeting Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <DatePicker.RangePicker
          showTime
          onChange={(val) => setTime(val)}
        />
      </Modal>
    </div>
  );
};

export default MeetingDashboard;