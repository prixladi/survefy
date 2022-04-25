import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ContentPart from '~components/content/content-part';
import Navbar from '~components/navbar';
import SubmitButton from '~components/form/form-submit-button';

import useSurveyCreate from '~lib/hooks/api/use-survey-create';
import { SurveyCreateDto, SurveyStepDto } from '~types';
import FormInput from '~components/form/form-input';
import PointDownIcon from '~components/point-down-icon';
import surveyStepType from '~lib/server/models/survey/survey-step-type';
import { useRouter } from 'next/router';
import pages from '~lib/pages';
import SEO from '~components/seo';

type Values = {
  name: SurveyCreateDto['name'];
  type: SurveyStepDto['type'];
  question: SurveyStepDto['question'];
};

const labelClassName = 'block text-lg font-semibold mb-2';
const inputClassName =
  'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200';

const NewSurvey: NextPage = () => {
  const { mutateAsync } = useSurveyCreate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>();

  const { t } = useTranslation('t');
  const { t: tSur } = useTranslation('t', { keyPrefix: 'dash.surveys.new' });
  const { t: tDash } = useTranslation('t', { keyPrefix: 'dash' });

  const router = useRouter();

  const submit = async (data: Values) => {
    const response = await mutateAsync({
      name: data.name,
      step: {
        type: data.type,
        question: data.question,
      },
    });

    if (response.status === 'serverError') {
      setError('name', { type: 'manual', message: t('serverError') });
    }
    if (response.status === 'conflict') {
      setError('name', { type: 'manual', message: tSur('tooManySurveys') });
    }

    if (response.status === 'ok') {
      router.push(pages.dashboard);
    }
  };

  return (
    <div>
      <SEO title={tSur('title')} />
      <Navbar isLoggedIn={true} />
      <div className="flex flex-col gap-4 md:gap-8 pt-20 md:pt-28 lg:pt-32 prose max-w-4xl m-auto">
        <ContentPart>
          <div className="font-bold text-4xl md:text-5xl text-center">{tSur('title')}</div>
        </ContentPart>
        <ContentPart>
          <main className="flex flex-col">
            <form
              className="px-2 pb-8 mb-4 flex flex-col gap-10 text-gray-700"
              onSubmit={handleSubmit(submit)}
            >
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="w-full">
                  <FormInput
                    id="name"
                    name={tSur('name')}
                    register={register('name', {
                      required: { value: true, message: tSur('nameRequired') },
                    })}
                    placeholder={tSur('namePlaceholder')}
                    labelClassName={labelClassName}
                    inputClassName={inputClassName}
                    error={errors.name}
                  />
                </div>
                <div className="w-full">
                  <label className={labelClassName} htmlFor="type">
                    {tSur('type')}
                  </label>
                  <div className="relative">
                    <select {...register('type')} className={inputClassName} id="type">
                      <option value={surveyStepType.input}>{tDash('surveyTypes.input')}</option>
                      <option value={surveyStepType.multichoice}>
                        {tDash('surveyTypes.multichoice')}
                      </option>
                    </select>
                    <PointDownIcon />
                  </div>
                </div>
              </div>
              <div>
                <FormInput
                  id="question"
                  name={tSur('question')}
                  register={register('question', {
                    required: { value: true, message: tSur('questionRequired') },
                  })}
                  placeholder={tSur('questionPlaceholder')}
                  labelClassName={labelClassName}
                  inputClassName={inputClassName}
                  error={errors.question}
                />
              </div>
              <SubmitButton isSubmitting={isSubmitting} text={tSur('button')} />
            </form>
          </main>
        </ContentPart>
      </div>
    </div>
  );
};

export default NewSurvey;
