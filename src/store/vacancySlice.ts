import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";


type Pagination = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
type Job = {
    id: number;
    company_name: string;
    name: string;
    city: string;
    salary: string;
    published_at: string;
    short_description: string;
    space: 'office' | 'remote' | 'hybrid';
    skills: string;
    experience: string;
}

type VacancyResponse = {
    success: boolean;
    pagination: Pagination;
    jobs: Job[];
}

type FullJob = Job & {
    description: string;
    about_company: string;
}

type FullJobResponse = {
    success: boolean;
    job: FullJob;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

type FetchVacancyParams = {
    page: number;
    search: string;
    city: string;
    skills: string[];
}

type VacancyState = {
    vacancies: Job[];
    pagination: Pagination;
    currentVacancy: FullJob | null;
    filters: {
        skills: string[];
        search: string;
        city: string;
        page: number;
    }
    status: Status;
    detailStatus: Status;
    error: string | null;
    detailError: string | null;
}

function buildQueryParam (params: FetchVacancyParams): string {
    const queryParams = new URLSearchParams();
    queryParams.set('page', String(params.page));

    if (params.skills.length > 0) {
        queryParams.set('skills', params.skills.join(','));
    }

    if (params.search) {
        queryParams.set('search', params.search);
    }
    if (params.city) {
        queryParams.set('city', params.city);
    }


    return `?${queryParams.toString()}`;
}

export const fetchVacancy =
    createAsyncThunk<VacancyResponse, FetchVacancyParams, {rejectValue: string}>('vacancy/fetchVacancy',
        async function (params, {rejectWithValue}) {

        const url = `https://kata-jobs.onrender.com/api/jobs${buildQueryParam(params)}`

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const vacancy = await response.json();
            return vacancy;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            return rejectWithValue('Ошибка загрузки')
        }
        }
        );

export const fetchVacancyById = createAsyncThunk<FullJobResponse, string, {rejectValue: string}>('vacancy/fetchVacancyById',
    async function ( id, {rejectWithValue}) {
    const url = `https://kata-jobs.onrender.com/api/jobs/${id}`;
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const vacancy: FullJobResponse = await response.json();
        return vacancy;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message)
        }
        return rejectWithValue('Ошибка загрузки')
    }

    }
    )

const initialState: VacancyState = {
    vacancies: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
    },
    currentVacancy: null,
    filters: {
        skills: ['JavaScript', 'React', 'Redux', 'Python'],
        search: '',
        city: '',
        page: 1,
    },
    status: 'idle',
    detailStatus: 'idle',
    error: null,
    detailError: null,
}

export const vacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
            state.filters.page = 1;
        },
        setSkill: (state, action: PayloadAction<string>) => {
            state.filters.skills.push(action.payload);
            state.filters.page = 1;
        },
        removeSkill: (state, action: PayloadAction<string>) => {
            state.filters.skills = state.filters.skills.filter(item => item !== action.payload);
            state.filters.page = 1;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.filters.city = action.payload;
            state.filters.page = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.filters.page = action.payload;
        },
        setFilters: (state, action: PayloadAction<VacancyState['filters']>) => {
            state.filters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVacancy.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });
        builder.addCase(fetchVacancy.fulfilled, (state, action) => {
            state.status = 'success';
            state.vacancies = action.payload.jobs;
            state.pagination = action.payload.pagination;
        });
        builder.addCase(fetchVacancy.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить';
        });
        builder.addCase(fetchVacancyById.pending, (state) => {
            state.detailStatus = 'loading';
            state.currentVacancy = null;
            state.detailError = null;
        });
        builder.addCase(fetchVacancyById.fulfilled, (state, action) => {
            state.detailStatus = 'success';
            state.currentVacancy = action.payload.job;
        });
        builder.addCase(fetchVacancyById.rejected, (state, action) => {
            state.detailStatus = 'error';
            state.detailError = action.payload ?? action.error.message ?? 'Не удалось загрузить';
        })
    }
})

export const {setSearch, setCity, setSkill, removeSkill, setPage, setFilters} = vacancySlice.actions;