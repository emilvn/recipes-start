import useInfo from "./hooks/useInfo.ts";

export default function Home() {
  const info = useInfo();

  return (
    <>
      <h2>Home</h2>
      <p>Welcome to our homepage! (mainly meant to learn React Router)</p>
      <img style={{ width: 200 }} src="./logo.png" alt="logo" />
      {info && (
        <>
          <h3>Info about the backend data used for this example</h3>
          <p>
            <span style={{ fontWeight: "bold" }}>Data taken from here:</span>{" "}
            {info.reference}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Data created:</span> {info.created}
          </p>
          <p>{info.info}</p>
        </>
      )}
    </>
  );
}
