import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { en } from "../../../languages/en";
import { de } from "../../../languages/de";

import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  //   "&:not(:last-child)": {
  //     borderBottom: 0,
  //   },
  color: "white",

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: "white", fontSize: "1.8rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#3E8ED0",
  borderRadius: "0.3rem",
  fontSize: "1rem",
  fontWeight: "300",

  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  color: "black",
}));

function CustomizedAccordion({
  num,
  summary,
  content,
}: {
  num: number;
  summary: string;
  content: string;
}) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === `panel${num}`}
      onChange={handleChange(`panel${num}`)}
    >
      <AccordionSummary
        aria-controls={`panel${num}d-content`}
        id={`panel${num}d-header`}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>
        <Typography className="font-light p-4 text-sm">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function CustomizedAccordions({
  language,
}: {
  language: string;
}) {
  const translation = language === "en" ? en : de;
  return (
    <div className="flex flex-col gap-4 mt-7">
      <CustomizedAccordion
        num={1}
        summary={translation.content.questions.first.question}
        content={translation.content.questions.first.answer}
      />

      <CustomizedAccordion
        num={2}
        summary={translation.content.questions.second.question}
        content={translation.content.questions.second.answer}
      />

      <CustomizedAccordion
        num={3}
        summary={translation.content.questions.third.question}
        content={translation.content.questions.third.answer}
      />

      <CustomizedAccordion
        num={4}
        summary={translation.content.questions.forth.question}
        content={translation.content.questions.forth.answer}
      />

      <CustomizedAccordion
        num={5}
        summary={translation.content.questions.fifth.question}
        content={translation.content.questions.fifth.answer}
      />

      <CustomizedAccordion
        num={6}
        summary={translation.content.questions.sixth.question}
        content={translation.content.questions.sixth.answer}
      />

      <CustomizedAccordion
        num={7}
        summary={translation.content.questions.seventh.question}
        content={translation.content.questions.seventh.answer}
      />

      <CustomizedAccordion
        num={8}
        summary={translation.content.questions.eighth.question}
        content={translation.content.questions.eighth.answer}
      />

      <CustomizedAccordion
        num={9}
        summary={translation.content.questions.ninth.question}
        content={translation.content.questions.ninth.answer}
      />

      <CustomizedAccordion
        num={10}
        summary={translation.content.questions.tenth.question}
        content={translation.content.questions.tenth.answer}
      />

      <CustomizedAccordion
        num={11}
        summary={translation.content.questions.eleventh.question}
        content={translation.content.questions.eleventh.answer}
      />

      <CustomizedAccordion
        num={12}
        summary={translation.content.questions.twelfth.question}
        content={translation.content.questions.twelfth.answer}
      />

      <CustomizedAccordion
        num={13}
        summary={translation.content.questions.thirdteenth.question}
        content={translation.content.questions.thirdteenth.answer}
      />
    </div>
  );
}
