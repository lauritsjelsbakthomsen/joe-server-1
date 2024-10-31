async function getImage() {
  try {
    let response = await fetch("/viggo");

    if (!response.ok) {
      throw new Error();
    }

    const responseTimeHeader = response.headers.get("X-Response-Time");

    console.log(`Response time from image ${responseTimeHeader}`);
  } catch (error) {
    console.log(error);
  }
}

async function getData() {
  let currentDate = Date.now();
  try {
    let response = await fetch("/res");

    if (!response.ok) {
      throw new Error();
    }

    const responseTimeHeader = response.headers.get("X-Response-Time");

    console.log(`Response time from /res ${responseTimeHeader}`);

    let data = await response.json();

    console.log(data.time - currentDate);
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  await getImage();
  await getData();
}

run();
