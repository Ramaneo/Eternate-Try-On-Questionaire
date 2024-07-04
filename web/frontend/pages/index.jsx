import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  DataTable,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

// import { useState, useEffect } from "react";
// import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../frontend/firebase";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "popUpQuestionaire"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
      setLoading(false);
    };

    fetchData();
  }, []);

  const rows = data.map((item) => [item.email, item.answer1, item.answer3]);

  const { t } = useTranslation();
  return (
    <Page title="Try -On Questionaire" narrowWidth>
      <LegacyCard>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columnContentTypes={["email", "text", "text"]}
            headings={["email", "question1", "question3"]}
            rows={rows}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
          />
        )}
      </LegacyCard>
    </Page>
  );
}
