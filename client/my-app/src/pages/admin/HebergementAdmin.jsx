import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFilteredData from '../../hooks/useFilteredData';
import { Badge } from '../../components/details/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronsUpDown,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import axios from 'axios';
import Pagination from '../../components/destination/Pagination';
import useFilteredHebergement from '../../hooks/useFilteredHebergement';
import { Checkbox } from './components/ui/checkbox';

const HebergementAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHebergements, setSelectedHebergements] = useState([]);


  const toggleSelect = (id) => {
    setSelectedHebergements((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedHebergements.length === hebergements.length) {
      setSelectedHebergements([]);
    } else {
      setSelectedHebergements(hebergements.map((h) => h.id));
    }
  };

  const deleteSelectedHebergements = async () => {
    if (selectedHebergements.length === 0) return;
    if (!window.confirm('Supprimer tous les hébergements sélectionnés ?'))
      return;

    try {
      await Promise.all(
        selectedHebergements.map((id) =>
          axios.delete(`http://localhost:5000/api/hebergement/${id}`)
        )
      );
      setSelectedHebergements([]);
      setPage(0); // refresh
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  const { hebergements, total } = useFilteredHebergement(
    'hebergement',
    page,
    sort,
    setLoading
  );

  const getStatusColor = (status) =>
    status === 'libre'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-400 hover:bg-red-600 text-red-800';

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-yellow-500 w-60"></span>
      </div>
    );
  }

  if (!hebergements || hebergements.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>No data found</div>
      </div>
    );
  }
  const handleSort = (column) => {
    setSort(([prevColumn, prevDirection]) => {
      if (prevColumn === column) {
        return [column, prevDirection === 'ASC' ? 'DESC' : 'ASC'];
      }
      return [column, 'ASC'];
    });
  };
  const filteredHebergements = (hebergements || []).filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteHebergement = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer cet hébergement ?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/hebergement/${id}`);
      setPage(0);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  const handleEditHebergement = (id) => {
    navigate(`/admin/hebergements/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestion des Hébergements
          </h1>
          <p className="text-muted-foreground">Gérez tous vos hébergements</p>
        </div>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => navigate('/admin/hebergements/create')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau hébergement
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative flex-1 my-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            placeholder="Rechercher par nom ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Table Hébergements */}
      <div>
        <div className='flex gap-10 items-center my-2'>
          <h1 className="my-2">Liste des hébergements ({total})</h1>
          {selectedHebergements.length > 0 ? (
            <button
              className="btn btn-sm btn-red"
              onClick={deleteSelectedHebergements}
              disabled={selectedHebergements.length === 0}
            >
              Supprimer les sélectionnés
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="rounded-xl border border-b-0 rounded-b-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {/* Checkbox globale */}
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={
                      selectedHebergements.length === hebergements.length
                    }
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                {/* Nom */}
                <TableHead className="flex items-center gap-2">
                  Nom
                  <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'name' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                {/* Ville */}
                <TableHead>
                  Ville
                  <button
                    type="button"
                    onClick={() => handleSort('city')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'city' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                {/* Pays */}
                <TableHead>
                  Pays
                  <button
                    type="button"
                    onClick={() => handleSort('country')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'country' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                {/* Prix */}
                <TableHead>
                  Prix
                  <button
                    type="button"
                    onClick={() => handleSort('prix_basique')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'prix_basique' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                <TableHead>
                  Note
                  <button
                    type="button"
                    onClick={() => handleSort('note')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'note' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                {/* Statut */}
                <TableHead>
                  Statut
                  <button
                    type="button"
                    onClick={() => handleSort('status')}
                    className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                  >
                    {sort[0] === 'status' ? (
                      sort[1] === 'ASC' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>

                {/* Actions */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredHebergements.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>
                    {' '}
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedHebergements.includes(h.id)}
                      onChange={() => toggleSelect(h.id)}
                    />
                  </TableCell>

                  <TableCell className="font-medium flex gap-5 items-center">
                    <img
                      src={
                        'https://images.unsplash.com/photo-1600289730889-17f9ad4c38f0?q=80&'
                      }
                      alt={h.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    {h.name}
                  </TableCell>
                  <TableCell>{h.city}</TableCell>
                  <TableCell>{h.country}</TableCell>
                  <TableCell className="font-semibold">
                    {h.prix_basique}
                  </TableCell>
                  <TableCell>{h.note}</TableCell>
                  <TableCell className="text-left">
                    <Badge className={getStatusColor(h.status)}>
                      {h.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex  justify-start items-center space-x-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEditHebergement(h.id)}
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDeleteHebergement(h.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination could be added here later */}
      <Pagination
        currentPage={page}
        numOfPages={Math.ceil(total / 5)}
        changePage={(e) => {
          setPage(Number(e.target.value));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default HebergementAdmin;
