import { createContext, useContext, useState, useEffect } from "react";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [textcontent, setTextcontent] = useState(null);
  const [sections, setSections] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/content.json")
      .then((response) => response.json())
      .then((data) => {
        setTextcontent(data);
        setSections(data.sectionscontent);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ContentContext.Provider value={{ textcontent, data, sections }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
