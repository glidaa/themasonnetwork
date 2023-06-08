/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Jokes } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function JokesUpdateForm(props) {
  const {
    id: idProp,
    jokes: jokesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    author: "",
    url: "",
    imageUrl: "",
    joke: "",
    content: "",
    source: "",
    publishedAt: "",
    createdAt: "",
    updatedAt: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [author, setAuthor] = React.useState(initialValues.author);
  const [url, setUrl] = React.useState(initialValues.url);
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [joke, setJoke] = React.useState(initialValues.joke);
  const [content, setContent] = React.useState(initialValues.content);
  const [source, setSource] = React.useState(initialValues.source);
  const [publishedAt, setPublishedAt] = React.useState(
    initialValues.publishedAt
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = jokesRecord
      ? { ...initialValues, ...jokesRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setAuthor(cleanValues.author);
    setUrl(cleanValues.url);
    setImageUrl(cleanValues.imageUrl);
    setJoke(cleanValues.joke);
    setContent(cleanValues.content);
    setSource(cleanValues.source);
    setPublishedAt(cleanValues.publishedAt);
    setCreatedAt(cleanValues.createdAt);
    setUpdatedAt(cleanValues.updatedAt);
    setErrors({});
  };
  const [jokesRecord, setJokesRecord] = React.useState(jokesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Jokes, idProp)
        : jokesModelProp;
      setJokesRecord(record);
    };
    queryData();
  }, [idProp, jokesModelProp]);
  React.useEffect(resetStateValues, [jokesRecord]);
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    author: [{ type: "Required" }],
    url: [{ type: "Required" }],
    imageUrl: [{ type: "Required" }],
    joke: [{ type: "Required" }],
    content: [],
    source: [],
    publishedAt: [],
    createdAt: [],
    updatedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description,
          author,
          url,
          imageUrl,
          joke,
          content,
          source,
          publishedAt,
          createdAt,
          updatedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Jokes.copyOf(jokesRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "JokesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              author,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              author,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Author"
        isRequired={true}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author: value,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={true}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url: value,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Image url"
        isRequired={true}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl: value,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
      ></TextField>
      <TextField
        label="Joke"
        isRequired={true}
        isReadOnly={false}
        value={joke}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke: value,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.joke ?? value;
          }
          if (errors.joke?.hasError) {
            runValidationTasks("joke", value);
          }
          setJoke(value);
        }}
        onBlur={() => runValidationTasks("joke", joke)}
        errorMessage={errors.joke?.errorMessage}
        hasError={errors.joke?.hasError}
        {...getOverrideProps(overrides, "joke")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke,
              content: value,
              source,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <TextField
        label="Source"
        isRequired={false}
        isReadOnly={false}
        value={source}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke,
              content,
              source: value,
              publishedAt,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.source ?? value;
          }
          if (errors.source?.hasError) {
            runValidationTasks("source", value);
          }
          setSource(value);
        }}
        onBlur={() => runValidationTasks("source", source)}
        errorMessage={errors.source?.errorMessage}
        hasError={errors.source?.hasError}
        {...getOverrideProps(overrides, "source")}
      ></TextField>
      <TextField
        label="Published at"
        isRequired={false}
        isReadOnly={false}
        value={publishedAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.publishedAt ?? value;
          }
          if (errors.publishedAt?.hasError) {
            runValidationTasks("publishedAt", value);
          }
          setPublishedAt(value);
        }}
        onBlur={() => runValidationTasks("publishedAt", publishedAt)}
        errorMessage={errors.publishedAt?.errorMessage}
        hasError={errors.publishedAt?.hasError}
        {...getOverrideProps(overrides, "publishedAt")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt: value,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              description,
              author,
              url,
              imageUrl,
              joke,
              content,
              source,
              publishedAt,
              createdAt,
              updatedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || jokesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || jokesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
