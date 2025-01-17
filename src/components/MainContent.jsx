// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

// import { useForkRef } from "@mui/material";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  const [nextPrayerIndex, setNextPrayerIndex] = useState(4);
  const [timings, setTimings] = useState({
    Fajr: "05:28",
    Dhuhr: "12:45",
    Asr: "16:10",
    Maghrib: "18:42",
    Isha: "19:57",
  });

  const [remainingTime, setRemainingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "كفر الشيخ",
    apiName: "Kafr El-Sheikh",
  });

  const [today, setToday] = useState("");

  const avilableCities = [
    {
      displayName: "كفر الشيخ",
      apiName: "Kafr El-Sheikh",
    },
    {
      displayName: "القاهره",
      apiName: "cairo",
    },
    {
      displayName: "الاسكندريه",
      apiName: "Alexandria",
    },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الضهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/timingsByAddress/29-09-2024?address=${selectedCity.apiName},eg&method=3`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    getTimings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  ////////////////////////////////
  ///////////////////////////////
  useEffect(() => {
    const t = moment(); // الحصول على الوقت الحالي

    // تعيين الوقت الأولي
    setToday(t.format("MMMM Do YYYY | h:mm a"));

    // تحديث الوقت كل دقيقة بإضافة دقيقة واحدة في كل مرة
    const intervall = setInterval(() => {
      t.add(1, "minute"); // إضافة دقيقة واحدة
      setToday(t.format("MMMM Do YYYY | h:mm a")); // تحديث الوقت
    }, 60000); // 60,000 مللي ثانية = دقيقة واحدة

    // تنظيف الـ interval عند إلغاء المكون
    return () => clearInterval(intervall);
  }, []);
  //////////////////////////////////
  //////////////////////////////////////

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    // const t = moment();
    // setToday(t.format("MMMM Do YYYY | h:mm a"));
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    const nextprayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextprayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
  };

  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log(event.target.value);
    setSelectedCity(cityObject);
  };

  return (
    <>
      {/* Top Row */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: { xs: 2, sm: 4 },
          textAlign: { xs: "center", sm: "left" },
        }}
        justifyContent={"center"}
      >
        <Grid
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            padding: 2,
          }}
          style={{ border: "1px solid white" }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>

        <Grid
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            padding: 2,
          }}
          style={{ border: "1px solid white" }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>

      {/* Top Row */}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginBottom: "40px", marginTop: "40px" }}
      >
        <FormControl style={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينه</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={avilableCities[0].apiName}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* SELECT CITY */}

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      {/* PRAYERS CARDS */}
      <Stack
        direction={{ xs: "column", m: "column", sm: "row" }}
        divider={<Divider flexItem />}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          marginTop: { xs: "20px", sm: "50px" },
          justifyContent: "center",
          alignItems: { xs: "center", sm: "flex-start" },
          padding: { xs: "10px", sm: "20px" },
        }}
      >
        <Prayer
          name="الفجر"
          time={converTimeFormat(timings.Fajr)}
          image="/Pray-Time/assets/360_F_243316414_0TS5HktGmnhnMUpvWrwSAneOB8cmIip8.jpg"
        />
        <Prayer
          name={"الضهر"}
          time={converTimeFormat(timings.Dhuhr)}
          image="/Pray-Time/assets/images (1).jpg"
        />
        <Prayer
          name="العصر"
          time={converTimeFormat(timings.Asr)}
          image="/Pray-Time/assets/images (2).jpg"
        />
        <Prayer
          name="المغرب"
          time={converTimeFormat(timings.Maghrib)}
          image="/Pray-Time/assets/images (3).jpg"
        />
        <Prayer
          name="العشاء"
          time={converTimeFormat(timings.Isha)}
          image="/Pray-Time/assets/images.jpg"
        />
      </Stack>

      {/* PRAYERS CARDS */}
    </>
  );
}

// function converTimeFormat(time) {
//   const [houers, minutes] = time.split(":");
//   let convertedHouers = houers;
//   let pm = "am";
//   if (parseInt(houers) > 12) {
//     convertedHouers = `0${houers - 12}`;
//     pm = "pm";
//   }

//   return `${convertedHouers}:${minutes}${pm}`;
// }

function converTimeFormat(time) {
  const [houers, minutes] = time.split(":");
  let convertedHouers = houers;
  let pm = "am";

  if (parseInt(houers) >= 12) {
    pm = "pm"; // اعتبار الساعات من 12 ظهرًا حتى 11:59 مساءً pm
    if (parseInt(houers) > 12) {
      convertedHouers = `0${houers - 12}`.slice(-2); // تحويل الساعات بعد 12 ظهرًا
    }
  }

  if (parseInt(houers) === 0) {
    convertedHouers = 12; // اعتبار الساعة 12 منتصف الليل كـ am
  }

  return `${convertedHouers}:${minutes}${pm}`;
}
