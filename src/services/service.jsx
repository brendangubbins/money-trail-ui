
const API_URL = "http://localhost:8000";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'API request failed');
  }

  return res.json();
}

export const contributionService = {
  getContributions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/get_contributions?${query}`);
  },

  // You can add more endpoints here:
  // TODO - add more
  postContribution: (data) =>
    request('/contributions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getStates: () => {
    return request('/get_states');
  },

  getStackedAreaChartData: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/get_contributions_over_time?${query}`);
  },

  getHistogramChartData: () => {
    return request('/get_contribution_count_by_range');
  },

  getContributionByState: () => {
    return request('/get_contribution_by_state');
  },
};

export default contributionService;