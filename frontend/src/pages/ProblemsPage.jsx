import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon, SearchIcon, FilterIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { useState, useMemo } from "react";

function ProblemsPage({ onLogout }) {
  const problems = Object.values(PROBLEMS);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get filter values from URL params
  const searchQuery = searchParams.get('search') || '';
  const difficultyFilter = searchParams.get('difficulty') || 'all';
  const sortBy = searchParams.get('sort') || 'title';
  const sortOrder = searchParams.get('order') || 'asc';

  // Local state for UI controls
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Define difficulty ordering outside of the sort function
  const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };

  // Filter and sort problems
  const filteredAndSortedProblems = useMemo(() => {
    let result = [...problems];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(problem => 
        problem.title.toLowerCase().includes(query) ||
        problem.category.toLowerCase().includes(query) ||
        problem.description.text.toLowerCase().includes(query)
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(problem => 
        problem.difficulty.toLowerCase() === difficultyFilter
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'difficulty':
          // Use predefined difficulty order
          aValue = difficultyOrder[a.difficulty.toLowerCase()];
          bValue = difficultyOrder[b.difficulty.toLowerCase()];
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return result;
  }, [problems, searchQuery, difficultyFilter, sortBy, sortOrder, difficultyOrder]);

  // Update search param
  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (localSearch) {
      newParams.set('search', localSearch);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Update difficulty filter
  const handleDifficultyFilter = (difficulty) => {
    const newParams = new URLSearchParams(searchParams);
    if (difficulty === 'all') {
      newParams.delete('difficulty');
    } else {
      newParams.set('difficulty', difficulty);
    }
    setSearchParams(newParams);
  };

  // Update sorting
  const handleSort = (field) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get('sort') === field) {
      // Toggle order if same field
      const currentOrder = newParams.get('order') || 'asc';
      newParams.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to asc
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    }
    setSearchParams(newParams);
  };

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  // Count for filtered problems
  const easyFilteredCount = filteredAndSortedProblems.filter((p) => p.difficulty === "Easy").length;
  const mediumFilteredCount = filteredAndSortedProblems.filter((p) => p.difficulty === "Medium").length;
  const hardFilteredCount = filteredAndSortedProblems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* FILTERS AND SEARCH */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 size-5" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="input input-bordered w-full pl-10"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="size-5 text-base-content/70" />
                <span className="font-medium">Difficulty:</span>
                <div className="flex gap-2">
                  <button
                    className={`btn btn-sm ${difficultyFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleDifficultyFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`btn btn-sm ${difficultyFilter === 'easy' ? 'btn-success' : 'btn-ghost'}`}
                    onClick={() => handleDifficultyFilter('easy')}
                  >
                    Easy
                  </button>
                  <button
                    className={`btn btn-sm ${difficultyFilter === 'medium' ? 'btn-warning' : 'btn-ghost'}`}
                    onClick={() => handleDifficultyFilter('medium')}
                  >
                    Medium
                  </button>
                  <button
                    className={`btn btn-sm ${difficultyFilter === 'hard' ? 'btn-error' : 'btn-ghost'}`}
                    onClick={() => handleDifficultyFilter('hard')}
                  >
                    Hard
                  </button>
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="font-medium">Sort by:</span>
                <div className="dropdown dropdown-bottom">
                  <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
                    {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} {sortOrder === 'asc' ? '↑' : '↓'}
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                    <li>
                      <button 
                        onClick={() => handleSort('title')}
                        className={sortBy === 'title' ? 'font-bold' : ''}
                      >
                        Title {sortBy === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSort('difficulty')}
                        className={sortBy === 'difficulty' ? 'font-bold' : ''}
                      >
                        Difficulty {sortBy === 'difficulty' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSort('category')}
                        className={sortBy === 'category' ? 'font-bold' : ''}
                      >
                        Category {sortBy === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-base-content/70">
            Showing {filteredAndSortedProblems.length} of {problems.length} problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {filteredAndSortedProblems.length > 0 ? (
            filteredAndSortedProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="card bg-base-100 hover:scale-[1.01] transition-transform"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between gap-4">
                    {/* LEFT SIDE */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Code2Icon className="size-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-bold">{problem.title}</h2>
                            <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-base-content/60"> {problem.category}</p>
                        </div>
                      </div>
                      <p className="text-base-content/80 mb-3">{problem.description.text}</p>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium">Solve</span>
                      <ChevronRightIcon className="size-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="card bg-base-100">
              <div className="card-body text-center py-12">
                <h3 className="text-xl font-bold mb-2">No problems found</h3>
                <p className="text-base-content/70">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
                {searchQuery || difficultyFilter !== 'all' ? (
                  <div className="stat-desc">{filteredAndSortedProblems.length} filtered</div>
                ) : null}
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblemsCount}</div>
                {searchQuery || difficultyFilter !== 'all' ? (
                  <div className="stat-desc">{easyFilteredCount} filtered</div>
                ) : null}
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblemsCount}</div>
                {searchQuery || difficultyFilter !== 'all' ? (
                  <div className="stat-desc">{mediumFilteredCount} filtered</div>
                ) : null}
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
                {searchQuery || difficultyFilter !== 'all' ? (
                  <div className="stat-desc">{hardFilteredCount} filtered</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;